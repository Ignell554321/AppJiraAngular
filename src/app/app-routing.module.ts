import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TareasComponent } from './componentes/tareas/tareas.component';

const routes: Routes = [

  { path: 'todo', component: TodoComponent },
  { path: 'tareas', component: TareasComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
