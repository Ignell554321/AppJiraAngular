import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TareasComponent } from './componentes/tareas/tareas.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { BacklogComponent } from './componentes/backlog/backlog.component';

const routes: Routes = [

  { path: 'todo', component: TodoComponent },
  { path: 'tareas', component: TareasComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'backlog', component: BacklogComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
