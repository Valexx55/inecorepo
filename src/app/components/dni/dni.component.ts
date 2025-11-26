import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.scss'],
  imports: [
    FormsModule,
    IonContent,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonLabel,
    IonItem,
    IonList,
    IonInput,
  ]
})
export class DniComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
