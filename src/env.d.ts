declare module '*.css?inline' {
  const css: string;
  export default css;
}
declare module '*.md?raw' {
  const markdown: string;
  export default markdown;
}
