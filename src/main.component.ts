export class MyComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = `<style>p { color: blue; }</style><p>Hello, World!</p>`;
    }
}

customElements.define('my-component', MyComponent);
