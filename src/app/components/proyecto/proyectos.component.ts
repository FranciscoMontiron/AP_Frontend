import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { StorageServiceService } from 'src/app/service/storage-service.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  p: Proyecto = null;

  closeResult: string;

  nombreP : string = '';
  urlP : string = '';
  descripcionP: string = '';
  imgP: string = '../../../assets/img/no-image.png';
  fecha: string = null;

  proyectos : Proyecto[] = [];

  constructor(private proyectoService : ProyectoService, private tokenService : TokenService, private storageService : StorageServiceService, private modalService: NgbModal) { }

  cargando = false;

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
    this.cargando = true;
    let imgFile = event.target.files;
    let reader = new FileReader();
    let nombreImg = 'img';

    reader.readAsDataURL(imgFile[0]);
    reader.onloadend = () => {
      this.storageService
        .subirImagen(nombreImg + '_' + Date.now(), reader.result)
        .then((urlP) => {
          console.log(urlP);
          this.imgP = urlP;
          this.cargando = false;
        });
    };
  }

  cargar() : void{
    this.proyectoService.getList().subscribe(data => {this.proyectos = data});
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
          this.proyectoService.delete(id).subscribe(data =>{
            this.cargar();
          }, err => {
            alert("No se puedo borrar el proyecto");
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
    this.nombreP="";
    this.descripcionP="";
    this.urlP="";
    this.imgP= '../../../assets/img/no-image.png';
    this.fecha="";
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then(async (result) => {
      this.closeResult = `Closed with: ${result}`;
      const proye = new Proyecto(this.nombreP,this.urlP,this.descripcionP,this.imgP,this.fecha);
      this.proyectoService.save(proye).subscribe(
        data => {
          this.cargar();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Pryecto añadido',
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
    this.proyectoService.getProyecto(id).subscribe(
      data => {
        this.p=data;
        this.nombreP=data.nombreP;
        this.descripcionP=data.descripcionP;
        this.urlP=data.urlP;
        this.imgP=data.imgP;
        this.fecha=data.fecha;
      },err => { alert ("Fallo");}
    )
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(async (result) => {
      this.closeResult = `Closed with: ${result}`;
      const proye = new Proyecto(this.nombreP,this.descripcionP,this.urlP,this.imgP, this.fecha);
      this.proyectoService.update(id,proye).subscribe(
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



}