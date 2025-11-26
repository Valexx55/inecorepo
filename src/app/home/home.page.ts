import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRouterLink, IonMenu, IonMenuToggle, IonIcon, IonItem, IonList, IonMenuButton, IonButtons, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonMenu, IonToolbar, 
    IonMenuToggle, IonIcon, IonContent, IonItem, IonTitle, 
    IonLabel, IonButtons, IonMenuButton, RouterLink, IonList,IonRouterLink],
  standalone:true,//no es impresicible pero va bien
  schemas: [CUSTOM_ELEMENTS_SCHEMA]//igualmente, puede no detectar los componentes de stencil ion-*  
})
export class HomePage {
  constructor() {}
}
