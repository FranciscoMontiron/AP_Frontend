import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/service/educacion.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {


  edu: Educacion = null;

  nombreE: string = '';
  descripcionE: string = '';
  fechaInicio: string = null;
  fechaFin: string =null;
  actual: boolean = false;

  closeResult: string;

  educacion: Educacion[] = [];

  constructor(private educacionS: EducacionService, private tokenService: TokenService, private modalService: NgbModal) { }
  isLogged = false;

  ngOnInit(): void {
    this.cargarEducacion();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarEducacion(): void{
    this.educacionS.lista().subscribe(
      data =>{
        this.educacion = data;
      }
    )
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
          this.educacionS.delete(id).subscribe(data =>{
            this.cargarEducacion();
          }, err => {
            alert("No se puedo borrar la educacion");
          })
        }
        Swal.fire(
          'Borrardo!',
          'Su educacion a sido eliminada con exito',
          'success'
        )
      }
    })
  }

  open(content: any) {
    this.nombreE="";
    this.descripcionE="";
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(async (result) => {
      this.closeResult = `Closed with: ${result}`;
      const e = new Educacion(this.nombreE, this.descripcionE, this.fechaInicio, this.fechaFin,this.actual);
      this.educacionS.save(e).subscribe(
        data => {
          this.cargarEducacion();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Educacion añadida',
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
    this.educacionS.detail(id).subscribe(
      data => {
        this.edu=data;
        this.nombreE=data.nombreE;
        this.descripcionE=data.descripcionE;
        this.fechaInicio=data.fechaInicio;
        this.fechaFin=data.fechaFin;
        this.actual=data.actual;
      },err => { alert ("Fallo");}
    )
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(async (result) => {
      this.closeResult = `Closed with: ${result}`;
      const expe = new Educacion(this.nombreE, this.descripcionE, this.fechaInicio, this.fechaFin,this.actual);
      this.educacionS.update(id,expe).subscribe(
        data => {
          this.cargarEducacion();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Experiencia actualizada',
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.educacion, event.previousIndex, event.currentIndex);
  }



}