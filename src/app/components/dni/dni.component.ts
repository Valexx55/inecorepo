import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MiCabeceraComponent } from 'src/app/core/mi-cabecera/mi-cabecera.component';

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.scss'],
  imports: [
    FormsModule,
    IonContent,
    IonButton,
    /*IonHeader,*/
    /*IonToolbar,*/
    /*IonTitle,*/
    /*IonButtons,*/
    /*IonBackButton,*/
    IonLabel,
    IonItem,
    IonList,
    IonInput,
    MiCabeceraComponent
  ]
})
export class DniComponent  implements OnInit, OnDestroy, AfterViewInit {

  letra!:string;
  numero!: number | null;
  titulo!: string;
  lista_dnis: number[] = []

  static readonly SECUENCIA_LETRAS_DNI: string = 'TRWAGMYFPDXBNJZSQVHLCKE';

  constructor() {
    this.titulo = 'CALCULO DE LA LETRA DE SU DNI';
   }
  
 

  ngOnInit() {
     console.log('🔵 ngOnInit → se ejecuta una sola vez al crear el componente');
  }

  ngAfterViewInit(): void {
    console.log('🔵 ngAfterViewInit → la vista Angular ya está renderizada');
    
  }

   ngOnDestroy(): void {
    console.log('🔵 ngOnDestroy → el componente se destruye definitivamente');
    
  }

  ionViewWillEnter() {
    console.log('🔵 ionViewWillEnter → la vista está a punto de entrar');
    // Ideal para recargar datos o estado fresco
    //parecido a onResume de Android
  }

  ionViewDidEnter() {
    console.log('🔵 ionViewDidEnter → la vista ya está visible');
    // Ideal para animaciones o iniciar listeners del DOM
    //cuando ya es visible
  }

  ionViewWillLeave() {
    console.log('🔵 ionViewWillLeave → la vista está a punto de salir');
    // Ideal para pausar tareas o guardar estado
    //antes de salir
  }

  ionViewDidLeave() {
    console.log('🔵 ionViewDidLeave → la vista ha dejado de ser visible');
    // Ideal para limpiar listeners temporales
    //similar a onpause, 
  }

  calcularLetra()
  {
    console.log ('calcular letra dni')
    alert ('calcular letra dni')

    if (this.numero)
    {
      let resto = this.numero % DniComponent.SECUENCIA_LETRAS_DNI.length;
      this.letra = DniComponent.SECUENCIA_LETRAS_DNI.charAt(resto);

      this.lista_dnis.push(this.numero);

      this.lista_dnis.sort((a, b) => a-b);

      //console.table(this.lista_dnis)
      console.log(this.lista_dnis)
    }
  }

}
