const componentMap: { [key: string]: string } = {
  "map-element": "./src/components/map-element.component",
};
export async function registerComponentDynamically(componentName: string): Promise<void> {
  const modulePath = componentMap[componentName];
  if (modulePath) {
    const module = await import(/* @vite-ignore */ modulePath);
    if (module && module.default && !customElements.get(componentName)) {
      customElements.define(componentName, module.default);
    }
  } else {
    console.error(`Component ${componentName} not found in componentMap.`);
  }
}
