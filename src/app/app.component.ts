import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import {App as CapacitorApp} from '@capacitor/app'
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  private platform = inject(Platform)

  constructor() {
    //this.platform.ready()//se usaba en Cordova para "conectar" la nativa
    this.inicializarApp();
  }

  async inicializarApp ()
  {

    

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


    } else {
      console.log("Estamos ejecutando en una web de verdad PC")
    }

    CapacitorApp.addListener('backButton', ({canGoBack}) => {
      console.log(`Tocó el botón hacia atrás ${canGoBack}`)
    })

    
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
        console.log(`appStateChange App en Foreground primer plano`)
      } else {
        console.log(`appStateChange App en Background segundo plano`)
      }
      console.groupEnd()

    })


  }
}
