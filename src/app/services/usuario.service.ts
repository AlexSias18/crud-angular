import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myAppUrl= 'https://localhost:44389/'
  private myApiUrl = 'api/usuario/'

  constructor(private http:HttpClient) { }

getListUsuarios(): Observable<any>{
  return this.http.get(this.myAppUrl +this.myApiUrl);
}
deleteUsuario(id: number):Observable<any>{
  return this.http.delete(this.myAppUrl + this.myApiUrl + id);
}
saveTarjeta(usuario: any):Observable<any>{
  return this.http.post(this.myAppUrl + this.myApiUrl, usuario)
}
updateUsuario(id:number, usuario: any):Observable<any>{
  return this.http.put(this.myAppUrl + this.myApiUrl + id,usuario);
}

}
