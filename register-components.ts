export function registerComponent(
  componentName: string,
  componentClass: CustomElementConstructor,
): void {
  if (!customElements.get(componentName)) {
    customElements.define(componentName, componentClass);
  }
}
