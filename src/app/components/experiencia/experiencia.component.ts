import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { TokenService } from 'src/app/service/token.service';
import { EditExperienciaComponent } from './edit-experiencia.component';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  expLab: Experiencia = null;

  nombreE: string = '';
  descripcionE: string = '';
  fechaInicio: string = null;
  fechaFin: string =null;
  actual: boolean = false;

  closeResult: string;
  expe: Experiencia[] = [];

  constructor(private sExperiencia: SExperienciaService, private tokenService: TokenService, private modalService: NgbModal) { }

  isLogged = false;

  ngOnInit(): void {
    this.cargarExperiencia();
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else {
      this.isLogged=false;
    }
  }

  cargarExperiencia():void{
    this.sExperiencia.lista().subscribe(data =>{this.expe=data;})
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
          this.sExperiencia.delete(id).subscribe(data =>{
            this.cargarExperiencia();
          }, err => {
            alert("No se puedo borrar la experiencia");
          })
        }
        Swal.fire(
          'Borrardo!',
          'Su expreriencia a sido eliminada con exito',
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
      const expe = new Experiencia(this.nombreE, this.descripcionE, this.fechaInicio, this.fechaFin,this.actual);
      this.sExperiencia.save(expe).subscribe(
        data => {
          this.cargarExperiencia();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Experiencia añadida',
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
    this.sExperiencia.detail(id).subscribe(
      data => {
        this.expLab=data;
        this.nombreE=data.nombreE;
        this.descripcionE=data.descripcionE;
        this.fechaInicio=data.fechaInicio;
        this.fechaFin=data.fechaFin;
        this.actual=data.actual;
      },err => { alert ("Fallo");}
    )
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(async (result) => {
      this.closeResult = `Closed with: ${result}`;
      const expe = new Experiencia(this.nombreE, this.descripcionE, this.fechaInicio, this.fechaFin,this.actual);
      this.sExperiencia.update(id,expe).subscribe(
        data => {
          this.cargarExperiencia();
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
    moveItemInArray(this.expe, event.previousIndex, event.currentIndex);
  }

}


