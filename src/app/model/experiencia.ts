export class Experiencia {
    id?:number;
    nombreE:string;
    descripcionE:string;
    fechaInicio:string;
    fechaFin:string;
    actual:boolean;
    constructor(nombreE:string,descripcionE:string,fechaInicio:string, fechaFin:string, actual:boolean){
        this.nombreE=nombreE;
        this.descripcionE=descripcionE;
        this.fechaInicio=fechaInicio;
        this.fechaFin=fechaFin;
        this.actual=actual;
    }
}
