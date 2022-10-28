export class Proyecto {
    id: number;
    nombreP: string;
    descripcionP: string;
    urlP: string;
    imgP: string;
    fecha: string;

    constructor(nombreP: string, descripcionP: string, urlP:string, imgP: string, fecha: string){
        this.nombreP=nombreP;
        this.descripcionP=descripcionP;
        this.urlP=urlP;
        this.imgP=imgP;
        this.fecha=fecha;
    }
}
