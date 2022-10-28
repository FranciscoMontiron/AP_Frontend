import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/service/skill.service';
import { StorageServiceService } from 'src/app/service/storage-service.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  skill : Skill = null;
  cargando = false;

  constructor(private skillService : SkillService, private actRoute : ActivatedRoute, private router : Router, private storageService:StorageServiceService) { }

  ngOnInit(): void {
    const id = this.actRoute.snapshot.params['id'];
    this.skillService.getSkill(id).subscribe(data=>{
      this.skill = data;
    },
    err=>{
      alert('Error al editar la Skill');
        this.router.navigate(['']);
    })
  }

  onUpdate(): void {
    const id = this.actRoute.snapshot.params['id'];

    this.skillService.update(id, this.skill).subscribe(
      data=>{
        alert('Skill editada correctamente')
        this.router.navigate(['']);
        },
      err=>{
        alert('Error al editar la skill');
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
      this.storageService
        .subirImagen(nombreImg + '_' + Date.now(), reader.result)
        .then((urlImagen) => {
          console.log(urlImagen);
          this.skill.imgS = urlImagen;
          this.cargando = false;
        });
    };
  }

}
