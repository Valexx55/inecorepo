import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonButton, IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-chijo',
  templateUrl: './chijo.component.html',
  styleUrls: ['./chijo.component.scss'],
  imports: [
    IonItem, 
    IonButton, 
    IonLabel,
    IonInput
  ]
})
export class ChijoComponent  implements OnInit {

  @Input() preves!:string;//PARA RX INFO DEL PADRE (PROPERTY BINDING)
  //PARA TX INFO AL PADRE 
  @Output() espalin = new EventEmitter<boolean>();//Tipo de dato que permoite el envío de datos del hijo al padre como una señal

  constructor() { }

  ngOnInit() {}

  infoPalin() {
  //voy a decirle al padre, si la preves es palíndroma
    //pasar info del hijo padre --< Output
    //si p reves espalin , le digo al padre true

    //si no, le digo al padre false
    let resultado: boolean = this.palindrome(this.preves);
    this.espalin.emit(resultado);
  }

   palindrome(str:string):boolean {
    var re = /[\W_]/g; // or var re = /[^A-Za-z0-9]/g;
    
    var lowRegStr = str.toLowerCase().replace(re, '');
   
    var reverseStr = lowRegStr.split('').reverse().join(''); 
   
    return reverseStr === lowRegStr; // "amanaplanacanalpanama" === "amanaplanacanalpanama"? => true
  }


  limpiar ()
  {
    this.preves='';//limpio el formulario del hijo
  }

}
