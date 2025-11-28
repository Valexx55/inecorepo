import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  Platform,
} from '@ionic/angular/standalone';
import { MiCabeceraComponent } from 'src/app/core/mi-cabecera/mi-cabecera.component';
import { GpsService } from 'src/app/services/gps';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonCardTitle,
    MiCabeceraComponent,
    IonContent,
  ],
})
export class GpsComponent implements OnInit {
  ubicacion: string = 'Esperando ubicación...';

  constructor(private gps: GpsService, private platform: Platform) {}

  ngOnInit() {
    //si quiero obtener la ubicación autmáticamente al entrar
    //this.obtenerUbicacion();
  }

  async accesoAUbicacion() {
    this.ubicacion = 'Clique para obtener ubicación';
    let pos = await this.gps.tryGetLocation();
    if (!pos) {
      console.log('GPS APAGADO / SIN ACCESO A LA UBICACIÓN');
      this.ubicacion = 'Gps apagado actívalo por favor';
    } else {
      console.log('ubicación obtenida, actualizando ubicación');
      this.ubicacion = `${pos.coords.latitude}, ${pos.coords.longitude}`;
    }
  }

  async obtenerUbicacion() {
    try {
      if (this.platform.is('android')) {
        
        this.ubicacion = 'Revisando permisos...';
        console.group('obteniendo ubicación');
        console.log('comprobando perimos');
        let perms = await this.gps.checkPermissions();

        if (perms.location !== 'granted') {
          console.log('sin permisos previos, pedimos');
          perms = await this.gps.requestPermissions();
          if (perms.location !== 'granted') {
            console.log('permiso denegado');
            this.ubicacion = 'Revisando permisos...';
            this.ubicacion = 'Permiso de ubicación denegado';
          } else {
            console.log('permiso concedido, accedemos a la ubicación');
            this.accesoAUbicacion();
          }
        } else {
          console.log('permiso ya concedido, accedemos a la ubicación');
          this.accesoAUbicacion();
        }
      } else {
        console.log('estoy en web');
        this.accesoAUbicacion();
      }
    } catch (err: any) {
      if (err?.message?.includes('Location services are not enabled')) {
        console.error(`${err?.message}`);
        await this.gps.openLocationSettingsIfAndroid();
      }

      console.error('Error inesperado:', err);
    }
    console.groupEnd();
  }

  async abrirAjustes() {
    this.gps.openLocationSettingsIfAndroid();
  }
}
