import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface CustomMarker {
  color: string;
  marker: mapboxgl.Marker;
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }

      .list-group{
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }

      li{
        cursor: pointer;
      }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [ number, number] = [-99.12973541418037, 19.29534041864119];

  marcadores: CustomMarker[] = [];


  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel,
    });

    /* const markerHTML: HTMLElement = document.createElement('div');
    markerHTML.innerHTML = 'Hola Jupiter'

    const maker = new mapboxgl.Marker({
      element: markerHTML
    })
      .setLngLat( this.center )
      .addTo( this.mapa ) */

  }

  addMarker() {

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat( this.center)
      .addTo( this.mapa );

    this.marcadores.push( {
      color,
      marker: newMarker
    } );
  }

  goMarker(){

  }


}
