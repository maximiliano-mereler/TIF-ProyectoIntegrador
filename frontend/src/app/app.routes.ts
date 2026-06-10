import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { DashboardComponent } from './pages/dashboard.component';
import { UsuariosComponent } from './pages/usuarios.component';
import { ClientesComponent } from './pages/clientes.component';
import { ProyectosComponent } from './pages/proyectos.component';
import { TareasComponent } from "./pages/tareas.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'proyectos', component: ProyectosComponent },
      { path: 'tareas/:proyectoId', component: TareasComponent }, 
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]

  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
