import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2'
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TareaService } from 'src/app/services/tarea.service';
import { Subtarea } from 'src/app/interfaces/subtarea';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/interfaces/sprint';
import { Tarea } from 'src/app/interfaces/tarea';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit{

  constructor(private modalService: NgbModal, private sprintService:SprintService, private usuarioService:UsuarioService,
  private formBuilder: FormBuilder) {}

  public disabledSelectApoyo:boolean=true;
  closeResult = '';
  public sprint!:Sprint;
  public tareas!:Tarea[];
  public usuarios!:Usuario[];
  public nuevaTarea:boolean=false;
  public frmTarea!: FormGroup;
  public frmSubTarea!: FormGroup;
  public numeroSprint:Number=0;
  public nombreProyecto:String='';

  ngOnInit(): void {

    this.frmTarea=this.crearFormTarea();
    this.frmSubTarea=this.crearFormSubTarea();

    let sprint:any = this.frmTarea.get('sprint');
     sprint.get('id').setValue(1);

    // console.log(this.frmTarea.value);

    this.usuarioService.listar.subscribe(res=>{
      this.usuarios=res as Usuario[];
    })

    this.sprintService.getSprintAct(1).subscribe(res=>{
      console.log(res);
      if(res!=null)
      {
        this.sprint=res as Sprint;
        this.numeroSprint=this.sprint.numero;
        this.nombreProyecto=this.sprint.proyecto.nombre;
        this.tareas=this.sprint.tareas;
        this.tareas.forEach(tarea=>{
          tarea.subtareas.forEach(subtarea=>{
              subtarea.tarea=tarea;
              if(subtarea.estado.id===2){
                this.todo.push(subtarea);
              }else if(subtarea.estado.id===1){
                this.progress.push(subtarea);
              }else if(subtarea.estado.id===6){
                this.review.push(subtarea);
              }else if(subtarea.estado.id===3){
                this.done.push(subtarea);
              }

          })
          
        })
      }

    });

      

   
  }

  private crearFormSubTarea(){

    return this.formBuilder.group({
      id: 0,
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
      responsable: this.formBuilder.group({
          id: [0,Validators.required]
      }),
      apoyo: this.formBuilder.group({
        id: [0,Validators.required]
      }),
      tiempoEmpleadoReal: '',
      tiempoEmpleadoPlanificado: ['',Validators.required],
      prioridad: ['',Validators.required],
      estado: {id: 2}, 
      tarea:{id:0}
  });

  }
  private crearFormTarea(){

    return this.formBuilder.group({

        id: 0,
        nombre:['',Validators.required],
        prioridad: ['',Validators.required],
        estado: {id: 2},
        subtareas: [],
        sprint:this.formBuilder.group({id:['',Validators.required] })

    });
  }

  activarApoyo(){

    this.disabledSelectApoyo=!this.disabledSelectApoyo;
  }

  open(content:any, subtarea:Subtarea) {

    console.log(subtarea);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);

	}

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  todo:Subtarea[]=[];
  progress:Subtarea[]=[];
  review:Subtarea[]=[];
  done:Subtarea[]=[];

  drop(event: CdkDragDrop<Subtarea[], any, any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      console.log(event.container.id);
      if(event.container.id==='list-done'){

        Swal.fire({
          title: '¿Deseas terminar esta tarea?',
          text: "No podras volver a editarla",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, cerrar'
        }).then((result) => {
          if (result.isConfirmed) {

            transferArrayItem(
              event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex,
            );

          }
        })

      }else{

        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );

      }
      
    }
  }

  guardarTarea(){

    this.nuevaTarea=true;


  }

  guardarSubtarea(){

  }

}
