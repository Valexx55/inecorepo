import { Injectable } from '@angular/core';
import { Geolocation, PermissionStatus, Position } from '@capacitor/geolocation';
import { NativeSettings, AndroidSettings } from 'capacitor-native-settings';
import { Capacitor } from '@capacitor/core';


@Injectable({
  providedIn: 'root',
})
export class GpsService {

    /** Comprobar permisos */
    //FIXME: al mirar si tengo permisos, si no está activo la ubicación, lanza una excepción
  async checkPermissions(): Promise<PermissionStatus> {
    console.log('comprobando permisos ...')
    return Geolocation.checkPermissions();
  }

    /** Pedir permisos */
  async requestPermissions(): Promise<PermissionStatus> {
    console.log('pidiendo permisos ...')
    return Geolocation.requestPermissions();
  }

    /** Intentar obtener ubicación (devuelve null si no puede) */
  async tryGetLocation(): Promise<Position | null> {
    try {
      console.log('en try get location ...')
      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: false,//true
        timeout: 7000,
      });
      return pos;
    } catch (err) {
      console.log('Error obteniendo ubicación', err);
      return null;
    }
  }

  /** Abrir ajustes de ubicación del dispositivo en Android */
  async openLocationSettingsIfAndroid() {

    console.log('en openLocationSettingsIfAndroid')
    if (Capacitor.getPlatform() === 'android') {
      await NativeSettings.openAndroid({
        option: AndroidSettings.Location,
      });
    }
  }
  
}
