import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  tarea:string='';



  todo:string[]=["Hacer comida", "Lavar los platos","Lavar la ropa"];
  progress:string[]=[];
  done:string[]=[];
 
  drop(event: CdkDragDrop<string[], any, any>) {
   if (event.previousContainer === event.container) {
     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
   } else {
     transferArrayItem(
       event.previousContainer.data,
       event.container.data,
       event.previousIndex,
       event.currentIndex,
     );
   }
 }
 
 agregarTarea(){
 
   this.todo.push(this.tarea);
   this.tarea="";
 }

}
