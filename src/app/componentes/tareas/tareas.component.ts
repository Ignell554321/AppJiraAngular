import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2'
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TareaService } from 'src/app/services/tarea.service';
import { Subtarea } from 'src/app/interfaces/subtarea';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/interfaces/sprint';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit{

  constructor(private modalService: NgbModal, private sprintService:SprintService) {}

  public disabledSelectApoyo:boolean=true;
  closeResult = '';
  public sprint!:Sprint;

  ngOnInit(): void {

    this.sprintService.getSprintAct(1).subscribe(res=>{
      console.log(res);
      if(res!=null)
      {
        this.sprint=res as Sprint;
        let tareas=this.sprint.tareas;
        tareas.forEach(tarea=>{
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

}
