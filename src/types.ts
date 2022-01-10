export interface Config {
  "show-icons": boolean;
  "installation-path": string;
}

export type SubPath<T, Key extends keyof T> = Key extends string
  ? T[Key] extends Record<string, any>
    ?
        | `${Key}.${SubPath<T[Key], Exclude<keyof T[Key], keyof any[]>> &
            string}`
        | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
    : never
  : never;
export type Path<T> = SubPath<T, keyof T> | keyof T;
export type PathValue<
  T,
  P extends Path<T>
> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

export type ConfigPath = Path<Config>;
export type ConfigPathValue<P extends ConfigPath> = PathValue<Config, P>;
