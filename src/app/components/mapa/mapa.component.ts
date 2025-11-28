import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import maplibregl, { Map } from 'maplibre-gl';
import { MiCabeceraComponent } from 'src/app/core/mi-cabecera/mi-cabecera.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
  imports: [
    IonContent,
    MiCabeceraComponent
  ]
})
export class MapaComponent  implements OnInit, OnDestroy, AfterViewInit {

  private map!:Map

  constructor() { }
  
 

  ngOnInit() {

    this.map = new maplibregl.Map({
      container: 'map',//el ID del HTML
      style: {
        version:8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ], 
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm-tiles-layer',
            type: 'raster',
            source: 'osm-tiles',
            minzoom: 0,
            maxzoom: 19,
          }
        ]
      }, 
      center: [-3.7038, 40.4168], //pos inicial Madrid
      zoom: 12, 
    })
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.map.resize();
    }, 200);
  }

   ngOnDestroy(): void {
    if (this.map) //borramos el mapa a la salida del component
    {
      this.map.remove();
    }
  }

}
