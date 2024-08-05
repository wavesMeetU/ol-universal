import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export class MapElement extends HTMLElement {
    private map!: Map;
    // private containerId: string;

    constructor(center: [number, number], zoom: number, containerId: string) {
        super();
        // this.containerId = containerId;
        this.attachShadow({ mode: 'open' });

        this.shadowRoot!.innerHTML = `
      <style>
        #map-container {
          width: 100%;
          height: 100vh;
          position: relative;
        }
        #map { 
          width: 100%; 
          height: 100vh; 
        }
        .controls {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1000;
        }
      </style>
      <div id="map-container">
        <div id="map"></div>
        <div class="controls">
          <slot name="control-slot"></slot>
        </div>
      </div>
    `;
      console.log(' map invoked');
      
        this.initializeMap(center, zoom);
    }

    private initializeMap(center: [number, number], zoom: number) {
        const mapElement = this.shadowRoot?.querySelector('#map') as HTMLElement;
        if (mapElement) {
            this.map = new Map({
                target: mapElement,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: center,
                    zoom: zoom,
                }),
            });
        } else {
            console.error('Map container not found');
        }
    }
    
    getMapInstance(): Map {
        if (!this.map) {
            throw new Error('Map instance is not initialized');
        }
        return this.map;
    }
}

// Define the custom element
customElements.define('map-element', MapElement);
