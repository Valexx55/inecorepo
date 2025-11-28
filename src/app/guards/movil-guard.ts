import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular/standalone';

export const movilGuard: CanActivateFn = async(route, state) => {

  let platform = inject(Platform);
  let toastController = inject(ToastController);

  let es_movil = platform.is('android')|| platform.is('ios');

  if (!es_movil)
  {
    let toast = await toastController.create({
      message: 'Esta página está sólo disponible en móviles',
      duration: 2000,
      color: 'warning',
      position: 'middle'
    })

    toast.present();
  }


  
  return es_movil;
};
