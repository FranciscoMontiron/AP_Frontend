import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/service/proyecto.service';
import { StorageServiceService } from 'src/app/service/storage-service.service';


@Component({
  selector: 'app-editproyecto',
  templateUrl: './editproyecto.component.html',
  styleUrls: ['./editproyecto.component.css']
})
export class EditProyectoComponent implements OnInit {

  proyecto : Proyecto = null;
  cargando = false;

  constructor(private proyectoService : ProyectoService, private actRoute : ActivatedRoute, private router : Router, private storageService:StorageServiceService) { }

  ngOnInit(): void {
    const id = this.actRoute.snapshot.params['id'];
    this.proyectoService.getProyecto(id).subscribe(data=>{
      this.proyecto = data;
    },
    err=>{
      alert('Error al editar experiencia');
        this.router.navigate(['']);
    })
  }

  onUpdate(): void {
    const id = this.actRoute.snapshot.params['id'];

    this.proyectoService.update(id, this.proyecto).subscribe(
      data=>{
        alert('Proyecto editado correctamente')
        this.router.navigate(['']);
        },
      err=>{
        alert('Error al editar el proyecto');
        this.router.navigate(['']);
      }
    )
  }

  cargarImagen(event: any) {

    let imgFile = event.target.files;
    let reader = new FileReader();
    let nombreImg = 'img';
    this.cargando = true;

    reader.readAsDataURL(imgFile[0]);
    reader.onloadend = () => {
      //console.log(reader.result);
      this.storageService
        .subirImagen(nombreImg + '_' + Date.now(), reader.result)
        .then((urlImagen) => {
          console.log(urlImagen);
          this.proyecto.imgP = urlImagen;
          this.cargando = false;
        });
    };
  }

}