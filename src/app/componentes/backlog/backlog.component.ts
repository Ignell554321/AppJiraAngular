import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Sprint } from 'src/app/interfaces/sprint';
import { Tarea } from 'src/app/interfaces/tarea';
import { SprintService } from 'src/app/services/sprint.service';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit{

  public isCollapsed = false;
  public sprints!:Sprint[];

  constructor(private sprintService:SprintService){
    console.log(window.innerHeight);
  }
  ngOnInit(): void {
    this.listar();
  }

  listar(){

    this.sprintService.listar.subscribe(res=>{
      console.log(res);
      this.sprints=res as Sprint[];
    })

  }

  crearSprint(){

  }

  empezarSprint(){

  }

  cerrarSprint(){
    
  }


}
