// decorators.ts

export function CustomElement(tagName: string) {
  return function (constructor: typeof HTMLElement) {
    customElements.define(tagName, constructor);
  };
}

interface ShadowDOMElement extends HTMLElement {
  connectedCallback?(): void;
}

export function ShadowDOM() {
  return function (constructor: typeof HTMLElement) {
    const proto = constructor.prototype as ShadowDOMElement;
    const originalConnectedCallback = proto.connectedCallback;

    proto.connectedCallback = function () {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: "open" });
      }
      if (originalConnectedCallback) {
        originalConnectedCallback.apply(this);
      }
    };
  };
}

export function Property() {
  return function (target: any, propertyKey: string) {
    const attributes = {
      attribute: propertyKey.toLowerCase(),
      reflect: true,
    };
    // Example of adding some metadata (this is simplified)
    target.constructor.attributes = attributes;
  };
}

export function Lifecycle() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`Calling ${propertyKey}`);
      return originalMethod.apply(this, args);
    };
  };
}

export function Inject() {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    console.log(`Injecting dependency into ${propertyKey} at index ${parameterIndex}`);
  };
}

interface CustomElement extends HTMLElement {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  adoptedCallback?(): void;
  attributeChangedCallback?(name: string, oldValue: string | null, newValue: string | null): void;
}

export function TemplateUrl(templateUrl: string) {
  return function (constructor: { new (): CustomElement }) {
    const originalConnectedCallback = constructor.prototype.connectedCallback;

    constructor.prototype.connectedCallback = async function () {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: "open" });
      }
      try {
        const url = new URL(templateUrl, import.meta.url).href;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch template: ${response.statusText}`);
        }
        const templateString = await response.text();
        this.shadowRoot!.innerHTML += templateString;
      } catch (error) {
        console.error("Error loading template:", error);
      }

      if (originalConnectedCallback) {
        originalConnectedCallback.apply(this);
      }
    };
  };
}

export function StyleUrl(styleUrl: string) {
  return function (constructor: { new (): CustomElement }) {
    const originalConnectedCallback = constructor.prototype.connectedCallback;

    constructor.prototype.connectedCallback = async function () {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: "open" });
      }
      try {
        const url = new URL(styleUrl, import.meta.url).href;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch style: ${response.statusText}`);
        }
        const styleString = await response.text();
        const styleElement = document.createElement("style");
        styleElement.textContent = styleString;
        this.shadowRoot!.appendChild(styleElement);
      } catch (error) {
        console.error("Error loading style:", error);
      }

      if (originalConnectedCallback) {
        originalConnectedCallback.apply(this);
      }
    };
  };
}
