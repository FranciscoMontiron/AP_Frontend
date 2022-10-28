import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  storageRef = firebase.app().storage().ref();

  constructor() { }

  async subirImagen(nombreImg: string, imgBase64: any) {

    try {
      let respuesta = await this.storageRef.child("/apportfolio/" + nombreImg).putString(imgBase64, 'data_url');
      console.log(respuesta);
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
    }

  }
}
