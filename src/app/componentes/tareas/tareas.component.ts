import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit{

  

  ngOnInit(): void {


  }

  todo:string[]=["Hacer comida", "Lavar los platos","Lavar la ropa"];
  progress:string[]=[];
  review:string[]=[];
  done:string[]=[];

  drop(event: CdkDragDrop<string[], any, any>) {
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
