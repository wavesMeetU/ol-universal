import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { CustomElement, TemplateUrl, StyleUrl } from "../utilitiy/decorators";

@CustomElement("map-element")
@TemplateUrl("./map-element.template.html")
@StyleUrl("./map-element.styles.css")
export class MapElement extends HTMLElement {
  private map!: Map;

  constructor() {
    super();
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
