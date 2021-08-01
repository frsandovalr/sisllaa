import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }


  async actualizarFoto( 
    archivo: File,
    id: number
  ) {

 try {
   const url = `${base_url}/usuario/upload/${id}`;
   const formData = new FormData();
   formData.append('archivo', archivo);
   
   const resp = await fetch(url, {
     method: 'PUT',
     headers: {
      'Authorization':'Bearer ' + localStorage.getItem('token')
     },
     body: formData
    });

    const data = await resp.json();
    
    if (data.ok) {
      console.log(data);
      return data.nombreArchivo;
    } else {
      console.log(data)
      return false;
    }

   
 } catch (error) {
     console.log(error); 
     return false;
 }

  }
}
