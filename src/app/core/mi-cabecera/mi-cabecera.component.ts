import { Component, Input, OnInit } from '@angular/core';
import { IonButton, IonButtons, IonHeader, IonIcon, IonRouterLink, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-mi-cabecera',
  templateUrl: './mi-cabecera.component.html',
  styleUrls: ['./mi-cabecera.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    /*IonBackButton, */
    IonButton, 
    IonIcon,
    //IonRouterLink// probar para usar el ion back button con progrmación declarativa
  ]
})
export class MiCabeceraComponent  implements OnInit {

  //@Input() defaultHref = 'home'; 
  @Input() titulo:String;

  constructor(private navController: NavController) {

    this.titulo = ''
    addIcons({'arrow-back': arrowBack})
   }

  ngOnInit() {}

  goBack(){
    this.navController.back()
  }

}
