import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonIcon, IonItem, IonList, LoadingController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { phoneLandscape, phonePortrait } from 'ionicons/icons';
import { Observer } from 'rxjs';
import { MiCabeceraComponent } from 'src/app/core/mi-cabecera/mi-cabecera.component';
import { Alumno } from 'src/app/models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
  imports: [
    MiCabeceraComponent,
    IonContent, 
    IonList, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent,
    DatePipe,
    IonItem, 
    IonFab,
    IonFabButton, 
    IonIcon
  ]
})
export class AlumnosComponent  implements OnInit {

  listaAlumnosRx!: Array<Alumno>;
  loading!: HTMLIonLoadingElement;
  headerOpacity = 1;

  isPortrait:boolean = true


  observerAlumnos: Observer<Array<Alumno>> = {
    next: (listaAlumnos: Array<Alumno>) => {
      this.listaAlumnosRx = listaAlumnos;
      console.table(this.listaAlumnosRx);

    },
    error: (err) => console.error('Observer got an error ' + err),
    complete: () => {
      //elimimanos el dibujo de espera
      if (this.loading) 
      {
        this.loading.dismiss()
      }

    }
  }


  constructor(private alumnoSerivce:AlumnoService, private loadingCtrl: LoadingController) { 

    addIcons({'phone-landscape': phoneLandscape,'phone-portrait':phonePortrait});
  }

  async cambiarOrientacion() {
    this.isPortrait = !this.isPortrait;

    if (this.isPortrait)
    {
      await ScreenOrientation.lock({orientation:'portrait'});
    } else {
      await ScreenOrientation.lock({orientation:'landscape'});
    }
  }



  onScroll(event:any)
  {
    //calculamos una nueva opacidad según descendemos
    console.log('onScroll');
    let scrollTop = event.detail.scrollTop;
    let opacity = 1 - scrollTop / 2000;
    this.headerOpacity = Math.max(0.2, opacity);

  }

  //otros eventos que podría escuchar
  //onScrollStart
  //onScrollEnd //para paginar dinámicamente


  ngOnInit() {
    this.mostrarCargando();
    this.alumnoSerivce.getAlumnos().subscribe(this.observerAlumnos)
    
    //trabajo con la orientación

    const consulta = window.matchMedia("(orientation: portrait)");

    this.isPortrait =  consulta.matches;

    console.log ('Estado inicial ' + this.isPortrait)

    consulta.addEventListener("change" ,
      (ev) => {
        this.isPortrait = ev.matches;
        if (this.isPortrait)
        {
          console.log('Pasó a vertical')
          //alert('Pasó a vertical')
        } else {
          console.log('Pasó a horizontal')
          //alert('Pasó a horizontal')
        }
      }
    )

  
  }

  async mostrarCargando() {

    this.loading = await this.loadingCtrl.create({
      message:'Esperando ...'
    })

    await this.loading.present();

  }

}
