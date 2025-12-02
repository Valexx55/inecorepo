import { Component, OnInit, ViewChild } from '@angular/core';
import { ChijoComponent } from '../chijo/chijo.component';
import { MiCabeceraComponent } from 'src/app/core/mi-cabecera/mi-cabecera.component';
import { IonButton, IonContent, IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comunica',
  templateUrl: './comunica.component.html',
  styleUrls: ['./comunica.component.scss'],
  imports: [
    MiCabeceraComponent,
    IonContent, 
    IonItem, 
    IonLabel,
    IonInput, 
    IonButton, 
    FormsModule, 
    ChijoComponent
  ]
})
export class ComunicaComponent  implements OnInit {

  palabra!:string;
  palabra_reves!:string;
  @ViewChild(ChijoComponent) hijo1!:ChijoComponent; 

  constructor() {
    this.palabra = '';
    this.palabra_reves='';
   }

  ngOnInit() {}

  daLaVuelta()
  {
    console.log("da la vuelta");
    this.palabra_reves = this.invertirCadena(this.palabra);

  }

  invertirCadena(cad:string):string {
    
    var nuevaCadena = "";
 
    
    for (var i = cad.length - 1; i >= 0; i--) { 
        nuevaCadena += cad[i]; // o nuevaCadena = nuevaCadena + cad[i];
    }
    
    return nuevaCadena; // "aloh"
}

  limpiarTodo() {
    console.log("limpiar todo");
    this.hijo1.limpiar();
  }

  informarPalin(palin:boolean)
  {
    alert(palin);

  }
}

