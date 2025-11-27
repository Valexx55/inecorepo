import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
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
  ],
})
export class GpsComponent implements OnInit {
  ubicacion: string = 'Esperando ubicación...';

  constructor(private gps: GpsService) {}

  ngOnInit() {
    //si quiero obtener la ubicación autmáticamente al entrar
    //this.obtenerUbicacion();
  }

  async obtenerUbicacion() {
    try {
      this.ubicacion = 'Obteniendo ubicación...';

      let perms = await this.gps.checkPermissions();

      if (perms.location !== 'granted') {
        alert('permisos no concedidos');
        perms = await this.gps.requestPermissions();
      }

      if (perms.location !== 'granted') {
        alert('permisos denegado');
        this.ubicacion = 'Permiso de ubicación denegado';
        return;
      }

      const pos = await this.gps.tryGetLocation();

      if (!pos) {
        alert('GPS APAGAO');
        this.ubicacion = 'GPS apagado. Actívalo por favor.';
        return;
      }

      alert('actualizando ubicación');
      this.ubicacion = `${pos.coords.latitude}, ${pos.coords.longitude}`;
    } catch (err: any) {
      if (err?.message?.includes('Location services are not enabled')) {
        console.log('👉 GPS APAGADO');
        this.ubicacion = 'GPS apagado. Actívalo en Ajustes.';
        await this.gps.openLocationSettingsIfAndroid();
        return;
      }

      console.error('Error inesperado:', err);
    }
  }


  async abrirAjustes() {
    this.gps.openLocationSettingsIfAndroid();
  }
}
