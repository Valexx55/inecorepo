import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { IonButton, IonContent, IonItem, IonLabel, IonList, IonRange } from '@ionic/angular/standalone';
import maplibregl, { Map } from 'maplibre-gl';
import { MiCabeceraComponent } from 'src/app/core/mi-cabecera/mi-cabecera.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
  imports: [
    IonButton,
    IonContent,
    MiCabeceraComponent, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonButton, 
    IonRange
  ]
})
export class MapaComponent  implements OnInit, OnDestroy, AfterViewInit {

  private map!:Map
  capasAbierto:boolean = false;
  relieveVisible: boolean = true;
  relieveOpacity: number = 0.6;

  constructor() { }

  capasBase: Record<string, any> = {

    osm: {
      type:'raster',
      tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors'

    },

    ignBase : {

      type:'raster',
      tiles: [
              'https://www.ign.es/wmts/ign-base?Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&Layer=IGNBaseTodo&Style=default&TileMatrixSet=GoogleMapsCompatible&TileMatrix={z}&TileCol={x}&TileRow={y}'
            ],
      tileSize: 256,
      attribution: '© IGN España'

    },
    pnoa : {

      type:'raster',
      tiles: [
              'https://www.ign.es/wmts/pnoa-ma?layer=OI.OrthoimageCoverage&style=default&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix={z}&TileCol={x}&TileRow={y}'
            ],
      tileSize: 256,
      attribution: '© PNOA IGN España'

    }
  };

  relieveSource:any = {
    type: 'raster',
    tiles: [
      'https://a.tile.opentopomap.org/{z}/{x}/{y}.png'
    ],
    tileSize: 256,
    attibution:'© OpenTopoMap (CC-BY-SA)'

  }
  

  cambiarOpacidad(evento:any)
  {
    this.relieveOpacity = evento.detail.value;
    this.map.setPaintProperty('relieve-layer', 'raster-opacity', this.relieveOpacity);

  }
 
  toggleRelieve()
  {
    this.relieveVisible = !this.relieveVisible;

    this.map.setLayoutProperty(
      'relieve-layer',
      'visibility',
      this.relieveVisible ? 'visible' : 'none'
    );
  }

  ngOnInit() {

    this.map = new maplibregl.Map({
      container: 'map',//el ID del HTML
      style: {
        version:8,
        sources: {
          base: this.capasBase['osm'],//this.capasBase['pnoa'] //this.capasBase['ignBase']//
          relieve: this.relieveSource
        },
        layers: [
          {
            id: 'base-layer',
            type: 'raster',
            source: 'base',
            minzoom: 0,
            maxzoom: 19,
          }, 
          {
            id: 'relieve-layer',
            type: 'raster',
            source: 'relieve',
            paint: {  'raster-opacity': this.relieveOpacity}

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

  cambiarBase(nombre:string)
  {
    if (this.map.getLayer('base-layer'))
    {
      this.map.removeLayer('base-layer')
    }

    if (this.map.getSource('base'))
    {
      this.map.removeSource('base')
    }

    this.map.addSource('base', this.capasBase[nombre]);

    this.map.addLayer(
      {
        id:'base-layer', 
        type: 'raster',
        source: 'base'
     
      }, 'relieve-layer'
    );

    //para dibujar la capa nueva bien
    setTimeout(() => {this.map.resize();}, 100);

  }

  toggleCapas()
  {
      this.capasAbierto = !this.capasAbierto;
  }


}
