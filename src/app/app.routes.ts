import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  {
    path: 'home', //Navegad así con loadComponent con import-then al estar en StandAlone, obligado
    //component: HomePage//esto no vale
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'dni',
    loadComponent: ()=> import('./components/dni/dni.component').then((m)=>m.DniComponent)
  },
  {
    //TODO: poner una guarda para que no pueda acceder a este Componente si no está en móvil
    path: 'gps',
    loadComponent: ()=> import('./components/gps/gps.component').then((m)=>m.GpsComponent)
  },
  {
    path: 'alumnos',
    loadComponent: ()=> import('./components/alumnos/alumnos.component').then((m)=>m.AlumnosComponent)
  },
  {
    path: 'com',
    loadComponent: ()=> import('./components/comunica/comunica.component').then((m)=>m.ComunicaComponent)
  }

];
