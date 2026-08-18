declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.module.css?raw" {
  const source: string;
  export default source;
}
