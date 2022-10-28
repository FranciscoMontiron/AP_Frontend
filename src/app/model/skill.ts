export class Skill {
    id: number;
    nombreS: string;
    porcentaje: number;
    imgS: string;

    constructor(nombreS: string, porcentaje: number, imgS: string){
        this.nombreS=nombreS;
        this.porcentaje=porcentaje;
        this.imgS=imgS;
    }
}
