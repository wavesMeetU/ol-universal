import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
export class MapElement extends HTMLElement {
  private map!: Map;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot!.innerHTML = `
      <style>
      @import url('https://unpkg.com/ol/ol.css');
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

    console.log("Map element created");
  }

  connectedCallback() {
    const centerAttr = this.getAttribute("center");
    // Convert the string to an array
    const center: [number, number] = centerAttr
      ? (JSON.parse(centerAttr) as [number, number])
      : [0, 0];
    const zoom = Number(this.getAttribute("zoom") || 5);

    console.log("Parsed center:", center);
    console.log("Parsed zoom:", zoom);

    if (
      Array.isArray(center) &&
      center.length === 2 &&
      !isNaN(center[0]) &&
      !isNaN(center[1]) &&
      !isNaN(zoom)
    ) {
      this.initializeMap(center, zoom);
    } else {
      console.error("Center or zoom attributes are not correctly set");
    }
  }

  private initializeMap(center: [number, number], zoom: number) {
    const mapElement = this.shadowRoot?.querySelector("#map") as HTMLElement;
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
      console.error("Map container not found");
    }
  }

  public getMapInstance(): Map {
    if (!this.map) {
      throw new Error("Map instance is not initialized");
    }
    return this.map;
  }
}

// Define the custom element

if (!customElements.get("map-element")) {
  customElements.define("map-element", MapElement);
}
