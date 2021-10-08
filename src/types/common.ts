export interface ActionCreator<P extends any[] = any[], A = any> {
  (...args: P): StoreAction<A>;
}

export interface StoreAction<T = any> {
  error?: boolean;
  meta?: PlainObject;
  payload?: T;
  type: string;
}

export type PlainObject<T = any> = Record<string, T>;

export type AnyObject<T = any> = Record<string, T>;
export type NarrowPlainObject<T> = Exclude<
  T,
  any[] | ((...args: any[]) => any)
>;

export interface ActionsMapReducer<State> {
  [type: string]: (draft: State, action: StoreAction) => any;
}

export type GenericFunction<T = any> = (...args: any[]) => T;

export type UseInputType = {
  type: string;
  defaultValue?: string;
  required?: boolean;
  min: string;
};

export type UseSelectType = {
  options: Array<string>;
  defaultValue?: string;
};
