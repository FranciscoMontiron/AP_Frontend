import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { StorageServiceService } from 'src/app/service/storage-service.service';

@Component({
  selector: 'app-newproyecto',
  templateUrl: './newproyecto.component.html',
  styleUrls: ['./newproyecto.component.css']
})
export class NewProyectoComponent implements OnInit {

  nombreP : string = '';
  urlP : string = '';
  descripcionP: string = '';
  imgP: string = '../../../assets/img/no-image.png';
  fecha: string = ""

  constructor(private proyectoService : ProyectoService, private router : Router, private storageService : StorageServiceService) { }

  cargando = false;

  ngOnInit(): void {
  }

  onCreate(): void{
    const proyecto = new Proyecto(this.nombreP,this.urlP,this.descripcionP,this.imgP, this.fecha);
    this.proyectoService.save(proyecto).subscribe(data =>{
      alert("Proyecto agregado correctamente!")
      this.router.navigate(['']);
    },err=>{
      alert("Fallo la operacion.")
      this.router.navigate(['']);
    })
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
          this.imgP = urlP;
          this.cargando = false;
        });
    };
  }

}
