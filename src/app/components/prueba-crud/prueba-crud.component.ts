import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-prueba-crud',
  templateUrl: './prueba-crud.component.html',
  styleUrls: ['./prueba-crud.component.css']
})
export class PruebaCrudComponent implements OnInit {
  listUsuarios: any[]=[];
  accion ='Agregar';

  form: FormGroup;
  id:number | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService) {
    this.form = this.fb.group({
      titular:['',Validators.required],
      dni:['',[Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      fechaExpiracion:['',[Validators.required,Validators.maxLength(5),Validators.minLength(5)]],
      cvv:['',[Validators.required,Validators.maxLength(3),Validators.minLength(3)]]
    })
   }

  ngOnInit(): void {
    this.obtenerUsuarios();
    
  }

  obtenerUsuarios(){
    this._usuarioService.getListUsuarios().subscribe(data => {
      console.log(data);
      this.listUsuarios=data;
    },error=>{
      console.log(error);
    })
  }

  guardarUsuario(){
    

    const usuario: any ={
      titular: this.form.get('titular')?.value,
      dni: this.form.get('dni')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,

    }
    if(this.id== undefined){
      //Agregarmos Usuario
      this._usuarioService.saveTarjeta(usuario).subscribe(data =>{
        this.toastr.success('Usuario registrado con exito', 'Usuario Registrado');
        this.obtenerUsuarios();
        this.form.reset();
      },error=>{
        this.toastr.error('Error','Ocurrio un errror');
        console.log(error);
      })
    }else{
      usuario.id= this.id;
      //Editamos Usuario
      this._usuarioService.updateUsuario(this.id,usuario).subscribe(data=>{
        this.form.reset();
        this.accion='Agregar'
        this.id=undefined;
        this.toastr.info('El usuario fue actualizado ', 'Usuario actualizado');
        this.obtenerUsuarios();
      },error=>{
        console.log(error);
      })
    }

   

    
    
  }

  eliminarUsuario(id:number){
    this._usuarioService.deleteUsuario(id).subscribe(data =>{
      this.toastr.error("El usuario fue eliminado con exito","Usuario ELiminado");
      this.obtenerUsuarios();
    }, error =>{
      console.log(error);
    })
    

  }

  editarUsuario(usuario: any){
    this.accion='Editar';
    this.id =usuario.id;

    this.form.patchValue({
      titular: usuario.titular,
      dni:usuario.dni,
      fechaExpiracion: usuario.fechaExpiracion,
      cvv:usuario.cvv
    })
  }
  

}
