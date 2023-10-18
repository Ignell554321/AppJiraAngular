import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-Jira';

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
