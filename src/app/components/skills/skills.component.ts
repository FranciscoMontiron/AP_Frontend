import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/service/skill.service';
import { StorageServiceService } from 'src/app/service/storage-service.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  s:Skill=null;

  closeResult: string;

  nombreS : string = '';
  porcentaje: number = 0;
  imgS: string = '../../../assets/img/no-image.png';

  skills: Skill[]=[];


  constructor(private skillService: SkillService, private tokenService : TokenService,private storageService : StorageServiceService, private modalService: NgbModal) { }

  cargando = false;

  skill : Skill = null;

  isLogged = false;

  ngOnInit(): void {
    this.cargar();

    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  cargarImagen(event: any) {
    //console.log(event.target.files);
    this.cargando = true;
    let imgFile = event.target.files;
    let reader = new FileReader();
    let nombreImg = 'img';

    reader.readAsDataURL(imgFile[0]);
    reader.onloadend = () => {
      //console.log(reader.result);
      this.storageService
        .subirImagen(nombreImg + '_' + Date.now(), reader.result)
        .then((urlP) => {
          console.log(urlP);
          this.imgS = urlP;
          this.cargando = false;
        });
    };
  }

  cargar():void{
    this.skillService.getList().subscribe(data => {this.skills = data})
  }

  delete(id?: number){

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Este cambio no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!'
    }).then((result) => {
      if (result.isConfirmed) {
        if( id!= undefined){
          this.skillService.delete(id).subscribe(data =>{
            this.cargar();
          }, err => {
            alert("No se puedo borrar la skill");
          })
        }
        Swal.fire(
          'Borrardo!',
          'Su proyecto a sido eliminado con exito',
          'success'
        )
      }
    })
  }

  open(content: any) {
    this.nombreS = '';
    this.porcentaje=0;
    this.imgS = '../../../assets/img/no-image.png';
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then(async (result) => {
      this.closeResult = `Closed with: ${result}`;
      const sk = new Skill(this.nombreS,this.porcentaje,this.imgS);
      this.skillService.save(sk).subscribe(
        data => {
          this.cargar();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Skill añadida',
            showConfirmButton: false,
            timer: 1700

})
        }, err => {
          alert("Fallo");
        }
      )
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
    );
  }

  update(content: any, id:number) {
    this.skillService.getSkill(id).subscribe(
      data => {
        this.s=data;
        this.nombreS=data.nombreS;
        this.porcentaje=data.porcentaje;
        this.imgS=data.imgS;
      },err => { alert ("Fallo");}
    )
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(async (result) => {
      this.closeResult = `Closed with: ${result}`;
      const sk = new Skill(this.nombreS,this.porcentaje,this.imgS);
      this.skillService.update(id,sk).subscribe(
        data => {
          this.cargar();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Skill guardada',
            showConfirmButton: false,
            timer: 1700

})
        }, err => {
          alert("Fallo");
        }
      )
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
    );
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
