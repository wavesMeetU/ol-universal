export class LayerControl extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot!.innerHTML = `
      <style>
        .control {
          padding: 10px;
          background: #fff;
          border: 1px solid #ddd;
        }
        ::slotted(button) {
          cursor: pointer;
          display: block;
          margin: 5px 0;
        }
      </style>
      <div class="control">
        <slot></slot>
      </div>
    `;
    }
}

customElements.define('layer-control', LayerControl);
