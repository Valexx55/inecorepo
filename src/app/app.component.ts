import { Component, inject, ViewChild } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import {App as CapacitorApp} from '@capacitor/app'
import { StatusBar } from '@capacitor/status-bar';
import { BackButton } from './core/back-button/back-button';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent  {

  //@ViewChild(IonRouterOutlet, { static: true }) routerOutlet!: IonRouterOutlet;
  //NOTA parece que detecta bien los gestos sin necesidad de programar nada más


  /*
  PARA EL ICONO DE LA APP Y LA SPLASH SCREEN 2 IMÁGENES

  ICONO APP 1024*1024
  SPLASH 2732 * 2732

  DIRECTORIO RAIZ CREAMOS LA SUBCARTEPA resources

  generamos el iocno y la splash
  npx @capacitor/assets generate --android

  //para las dos plaformas
  npx @capacitor/assets generate --android --ios


  */

  private platform = inject(Platform)
  private backButton = inject(BackButton)

  constructor() {
    //this.platform.ready()//se usaba en Cordova para "conectar" la nativa
    this.inicializarApp();
  }

 

  async inicializarApp ()
  {

    //programamos la gestión del evento hacia atrás
    this.backButton.init();

    if (this.platform.is('android') || this.platform.is('ios'))
    {
      console.log("Estamos ejecutando en un móvil")
      //1 opción cláisca que no solape
      //await StatusBar.setOverlaysWebView({overlay:false})
      //await StatusBar.setBackgroundColor({color: '#3880ff'})
      //2 opción moderna que solape
      await StatusBar.setOverlaysWebView({overlay:true})
      //para que la barra sea transaparente, va en negro
      await StatusBar.setBackgroundColor({color: '#00000000'})

      if (this.platform.is('android')) {
            StatusBar.hide(); //para borrar la status bar. cada vez que entre se repinta y debo ocultarla
      }

    } else {
      console.log("Estamos ejecutando en una web de verdad PC")
    }

    //lo gestionamos en el servicio backbutton
    /*
    CapacitorApp.addListener('backButton', ({canGoBack}) => {
      console.log(`Tocó el botón hacia atrás ${canGoBack}`)
      //if (canGoBack)
      //{
        console.log('Saliendo de la app')
        CapacitorApp.exitApp();
      //}
    })
    */
    
    //sólo salta en Android
    CapacitorApp.addListener('pause', () => {
      console.log(`La app ha sido pausada`)
    })


    //a veces en IOS no va
    CapacitorApp.addListener('resume', () => {
      console.log(`La app ha vuelto a primera plana`)
    })

    CapacitorApp.addListener('appStateChange', ({isActive}) => {
      console.group(`appStateChange ${isActive}`)
      if (isActive)
      {
         if (this.platform.is('android')) {
            StatusBar.hide(); //para borrar la status bar. cada vez que entre se repinta y debo ocultarla
         }
        console.log(`appStateChange App en Foreground primer plano`)
      } else {
        console.log(`appStateChange App en Background segundo plano`)
      }
      console.groupEnd()

    })


  }
}
