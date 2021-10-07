import is from 'is-lite';
import produce from 'immer';
import { Reducer } from 'redux';

import {
  AnyObject,
  NarrowPlainObject,
  ActionCreator,
  ActionsMapReducer,
  GenericFunction,
  StoreAction,
} from 'types';

/**
 * Create an action
 */
export function createAction<T extends GenericFunction>(
  type: string,
  payloadCreator?: T
): ActionCreator<Parameters<T>, ReturnType<T>> {
  if (!payloadCreator) {
    return () => ({
      type,
    });
  }

  return (...args: any[]) => ({
    type,
    payload: payloadCreator(...args),
  });
}

/**
 * Create a reducer
 */
export function createReducer<State>(
  actionsMap: ActionsMapReducer<State>,
  defaultState: State
): Reducer<State, StoreAction> {
  return (state = defaultState, action: StoreAction) =>
    produce(state, (draft: State) => {
      const fn = actionsMap[action.type];

      if (fn) {
        return fn(draft, action);
      }

      return draft;
    });
}

/**
 * Set the key as the value
 */
export function keyMirror<T extends AnyObject>(
  input: T & NarrowPlainObject<T>
): { [K in keyof T]: K } {
  if (!is.plainObject(input)) {
    throw new TypeError('Expected an object');
  }

  const output: any = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key in input) {
    /* istanbul ignore else */
    if (!Object.prototype.hasOwnProperty.call(output, key)) {
      output[key] = key;
    }
  }

  return output;
}
