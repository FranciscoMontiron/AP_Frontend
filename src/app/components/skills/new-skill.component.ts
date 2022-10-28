import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/service/skill.service';
import { StorageServiceService } from 'src/app/service/storage-service.service';

@Component({
  selector: 'app-new-skill',
  templateUrl: './new-skill.component.html',
  styleUrls: ['./new-skill.component.css']
})
export class NewSkillComponent implements OnInit {

  nombreS : string = '';
  porcentaje: number = 0;
  imgS: string = '../../../assets/img/no-image.png';

  constructor(private skillService : SkillService, private router : Router, private storageService : StorageServiceService) { }

  cargando = false;

  ngOnInit(): void {
  }

  onCreate(): void{
    const skill = new Skill(this.nombreS,this.porcentaje,this.imgS);
    this.skillService.save(skill).subscribe(data =>{
      alert("Skill agregada correctamente!")
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
        .then((urlS) => {
          console.log(urlS);
          this.imgS = urlS;
          this.cargando = false;
        });
    };
  }

}
