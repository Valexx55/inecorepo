import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonList, LoadingController } from '@ionic/angular/standalone';
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
    IonItem
  ]
})
export class AlumnosComponent  implements OnInit {

  listaAlumnosRx!: Array<Alumno>;
  loading!: HTMLIonLoadingElement;


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

  }




  ngOnInit() {
    this.mostrarCargando();
    this.alumnoSerivce.getAlumnos().subscribe(this.observerAlumnos)
  }

  async mostrarCargando() {

    this.loading = await this.loadingCtrl.create({
      message:'Esperando ...'
    })

    await this.loading.present();

  }

}
