import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { StorageServiceService } from 'src/app/service/storage-service.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  persona: persona = new persona("","","","","","","");

  p: persona = null;

  closeResult: string;

  nombre : string = '';
  apellido : string = '';
  img: string = "";
  profesion: string = '';
  descripcion: string='';
  banner: string='';
  cv: string = '';

  constructor(public personaService: PersonaService , private tokenService : TokenService, private modalService: NgbModal, private storageService : StorageServiceService) { }

  isLogged = false;

  cargando = false;

  ngOnInit(): void {
    this.cargar();
    
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  cargar(): void {
    this.personaService.getPersona(1).subscribe(data => {this.persona = data}) //subcribe conecta el observer con algun evt obervable, esta esperando cambio continuamente
  }

  private delete(id :number):void{}


  update(content: any, id:number) {
    this.personaService.getPersona(id).subscribe(
      data => {
        this.p=data;
        this.nombre=data.nombre;
        this.apellido=data.apellido;
        this.img=data.img;
        this.profesion=data.profesion;
        this.descripcion=data.descripcion;
        this.banner=data.banner;
        this.cv=data.cv;
      },err => { alert ("Fallo");}
    )
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(async (result) => {
      this.closeResult = `Closed with: ${result}`;
      const per = new persona(this.nombre,this.apellido,this.img,this.profesion,this.descripcion,this.banner, this.cv);
      this.personaService.update(id,per).subscribe(
        data => {
          this.cargar();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Proyecto agregado',
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
        .then((url) => {
          console.log(url);
          this.banner = url;
          this.cargando = false;
        });
    };
  }


}
