import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import { differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import {UsuarioService} from '../../services/usuario.service'
import { Usuario } from 'src/app/interfaces/usuario';
import { tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{

  public meses?: number;
  public dias?: number;
  public horas?: number;
  public minutos?: number;
  public usuarios?:Usuario[];
  public frmUsuario!: FormGroup;
  public textoDelBoton:string='REGISTRAR';

  @ViewChild('btnGuardarUsuario', { static: false }) btnGuardarUsuario!: ElementRef

  constructor(private usuarioService:UsuarioService,private formBuilder: FormBuilder) {}

  ngOnInit(): void {
     this.listar();
     this.frmUsuario=this.crearFormUsuario();
  }

  private crearFormUsuario(){

    return this.formBuilder.group({

      id:0,
      responsable: this.formBuilder.group({
         id:0, 
         nombres:['',Validators.required],
         apellidos:['',Validators.required], 
         cargo:['',Validators.required], 
         correo:['',Validators.required]
        }),
        estado:{id: 2 }

    });
  }

  listar(){


    this.usuarioService.listar/*.pipe(
      tap(resp=>{
       
         (resp as Usuario[]).forEach(element => {
            console.log(element.id);
        });
      })
    )*/.subscribe(res=> this.usuarios=res as Usuario[]);

    
    
  }

  obtenerUsuario(id:number){

    this.textoDelBoton="EDITAR";
    this.usuarioService.getUsuario(id).subscribe(usuario=>{
      this.frmUsuario.setValue(usuario as Usuario);
    });
    
  }

  cancelar(){
    this.textoDelBoton="REGISTRAR";
    this.resetarFormulario();
  }


  guardar(){

    if(this.frmUsuario.valid){
      const objeto: Usuario = Object.assign({}, this.frmUsuario.value)

      //console.log(objeto);

      this.usuarioService.create(objeto).subscribe(res=>{

        //console.log(res);
        this.listar();
        this.resetarFormulario();

      })

      if (objeto.id !== 0){this.textoDelBoton="REGISTRAR";}

      /*if (objeto.id === 0){

        
      
      }else{


      }*/

    }

    

  }

  eliminar(id:number){

    
    
    Swal.fire({
      title: '¿Deseas eliminar este usuario?',
      text: "No podras volver a visualizarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.delete(id).subscribe(res=>{
          console.log(res);
          this.listar();
        });

      }
    })


    

  }


  resetarFormulario(){

    this.frmUsuario.reset({
      
      id:'0',
      responsable: {
         id:'0', 
         nombres:'',
         apellidos:'', 
         cargo:'',
         correo:''
        },
        estado:{id: 2 }

      });

  }




 



}
