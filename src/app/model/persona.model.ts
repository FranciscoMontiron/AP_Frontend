export class persona{
    id: number;
    nombre: string;
    apellido: string;
    img: string;
    profesion: string;
    descripcion: string;
    banner: string;
    cv: string;

    constructor(nombre: string, apellido: string, img: string, profesion:string, descripcion:string, banner:string, cv:string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.img = img;
        this.profesion = profesion;
        this.descripcion = descripcion;
        this.banner=banner;
        this.cv = cv;
    }
}