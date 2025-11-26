import { Injectable } from '@angular/core';
import { App as CapacitorApp } from '@capacitor/app';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import {
  AlertController,
  MenuController,
  ModalController,
  NavController,
} from '@ionic/angular/standalone';
import { BackButtonAction } from './back-button-action';
import { BACK_BUTTON_CONFIG } from './back-button-config';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class BackButton {
  constructor(
    private modalController: ModalController, // servicio que permite abrir, cerrar ventanas modales
    private menuController: MenuController, //para controlar el ion-menu
    private alertControlle: AlertController, //para mostrar alerts para confirmar
    private navController: NavController //para la gestión de las rutas es un envoltorio ionic sobre Router de angular
  ) {}

  init() {
    CapacitorApp.addListener('backButton', async({ canGoBack }) => {
      Haptics.impact({ style: ImpactStyle.Light }); //cuando le hacia atrás, vibra
      console.log('Botón hacia atrás tocado');
      //1 identifamos la acción/contexto
      let action = await this.resolverAccion(canGoBack);
      console.log(`Acción ${action}`);
      //2 ejecutamos la acción según el contexto
      this.ejecutarAccion(action);
      //TODO: completamos las acciones del botón hacia ir atrás
    });
  }

  //al ser métdo asyncrono ,se envuelve en un promesa
  async resolverAccion(canGoBack: Boolean): Promise<BackButtonAction> {
    let accion: BackButtonAction;

    //1 si hay un modal abierto?
    let modal = await this.modalController.getTop();
    if (modal) {
      accion = BackButtonAction.CloseModal;
    } else {
      //2 hay un menú abierto
      let menu = await this.menuController.isOpen();
      if (menu) {
        accion = BackButtonAction.CloseMenu;
      } else {
        ////3 chequeamos rutas bloquedas
        let rutaActual = window.location.pathname;
        console.log(`ruta actual = ${rutaActual}`);
        let rutasBloquedas = BACK_BUTTON_CONFIG.blockRoutes;
        if (rutasBloquedas.includes(rutaActual)) {
          accion = BackButtonAction.BlockInCertainRoutes;
        } else {
          //4 hay historial?
          if (canGoBack) {
            accion = BackButtonAction.NavigateBack;
          } else {
            //5 está en inicio?
            if (rutaActual == BACK_BUTTON_CONFIG.homeRoute) {
              accion = BackButtonAction.ExitApp;
            } else {
              //6 último recurso no sé donde está
              accion = BackButtonAction.GoHome;
            }
          }
        }
      }
    }

    //automáticamente nos hace esto el código, nos envuelve el resultado en la promesa
    //pero si lo queremos hacer
    //return new Promise (()=>{accion});
    //return new Promise ((bien, mal)=>{accion});
    return accion;
  }


  async ejecutarAccion(action: BackButtonAction) {
    switch (action) {
      case BackButtonAction.CloseModal:
        (await this.modalController.getTop())?.dismiss()
        console.log('😎 Cerrando modal ');
        break;

      case BackButtonAction.CloseMenu:
        this.menuController.close();
        console.log('😎 Cerrando menu ');
        break;

      case BackButtonAction.BlockInCertainRoutes:
        //NO HAY NINGÚN ACCIÓN
        console.log('😎 Rutas protegidas no hacemos nada ');
        break;

      case BackButtonAction.NavigateBack:
        this.navController.back();
        console.log('😎 Navegando hacia atrás ');
        break;

      case BackButtonAction.ExitApp:
        //CapacitorApp.exitApp();
        //TODO: mostrar una ventana/diálogo
        let saltarConfirmacion = await Preferences.get({key: 'skipExitConfirm'})
        if (saltarConfirmacion?.value)
        {
          console.log('El usuario quiere salir sin confirmar');
          CapacitorApp.exitApp();

        } else {
          console.log('El usuario quiere salir confirmando');
          let resultado =  await this.mostrarAlertaConfirmaSalir();
          if (resultado.dontAskAgain)
          {
            await Preferences.set({key:'skipExitConfirm', value: 'true'})
          }
          if (resultado.confirmed)
          {
            CapacitorApp.exitApp();
          }
        }
        console.log('😎 Saliendo de la app ');
        break;

      case BackButtonAction.GoHome:
        window.location.href = BACK_BUTTON_CONFIG.homeRoute;
        console.log('😎 Go home opción por defecto ');
        break;
    }
  }

  async mostrarAlertaConfirmaSalir() {
    let mensaje =  await this.alertControlle.create({
      header: 'Salir de la app',
      message: '¿Seguro que quiere salir?',
      inputs: [
        {
          type: 'checkbox',
          label: ' No volver a preguntar',
          value: 'skip'
        }
      ], 
      buttons: [
        {
          text: 'Cancelar', 
          role: 'cancel'
        },
        {
          text: ' Salir',
          role: 'confirm',
        }
      ]
    });

    await mensaje.present();

    let result = await mensaje.onDidDismiss();

    return {
      confirmed: result.role === 'confirm',
      dontAskAgain: result.data?.values?.includes('skip')
    }

  }
}
