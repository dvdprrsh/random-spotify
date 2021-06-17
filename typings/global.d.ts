export declare global {
  interface GenericObject<T = any> {
    [key: string]: T;
  }
}
