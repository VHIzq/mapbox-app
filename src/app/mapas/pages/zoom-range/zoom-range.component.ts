import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }

      .row {
        background-color: whitesmoke;
        position: fixed;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        border-radius: 5px;
        width: 400px;
        z-index: 799;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [ number, number] = [-99.12973541418037, 19.29534041864119];

  constructor() {}

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {} );
    this.mapa.off('zoomend', () => {} );
    this.mapa.off('move', () => {} );
  }
;

  ngAfterViewInit() {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel,
    });

    this.mapa.on('zoom', () => {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('move', (event) => {
      const target = event.target;
      const { lng, lat} = target.getCenter();
      this.center = [lng, lat];
    });


    this.mapa.on('zoomend', () => {
      if( this.mapa.getZoom() > 18 ) {
        this.mapa.zoomTo( 18 );
        }
    })
  }

  zoomOut() {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomIn() {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomCambio( valor: string) {
    this.mapa.zoomTo( Number(valor))
  }
}
