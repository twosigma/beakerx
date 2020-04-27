/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/


/**
 * An object which represents an action for a data store.
 *
 * #### Notes
 * Actions are dispatched to a data store to change its state.
 */
export
interface IAction {
    /**
     * The type of the action.
     */
    readonly type: string;
}


/**
 * A concrete implementation of `IAction`.
 *
 * #### Notes
 * Custom actions may derive from this class.
 *
 * This class is useful for creating strongly-type actions which
 * are combined into a discriminated union, and used from within
 * a `switch` statement inside a reducer.
 */
export
class Action<T extends string> implements IAction {
    /**
     * Construct a new action.
     *
     * @param type - The type of the action.
     */
    constructor(type: T) {
        this.type = type;
    }

    /**
     * The type of the action.
     */
    readonly type: T;
}

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
import {
    ISignal, Signal
} from '@lumino/signaling';

/**
 * A lightweight data store which mostly follows the redux pattern.
 *
 * #### Notes
 * The `S` type parameter is an interface defining the state shape.
 *
 * More information on redux can be found at: http://redux.js.org
 */
export
class DataStore<S> {
    /**
     * Construct a new data store.
     *
     * @param reducer - The root reducer function for the data store.
     *
     * @param state - The initial state for the data store.
     */
    constructor(reducer: Reducer<S>, state: S) {
        this._reducer = reducer;
        this._state = state;
    }

    /**
     * A signal emitted when the data store state is changed.
     */
    get changed(): ISignal<this, void> {
        return this._changed;
    }

    /**
     * The current state of the data store.
     *
     * #### Notes
     * The state **must** be treated as immutable.
     *
     * The only way to change the state is to dispatch an action.
     */
    get state(): S {
        return this._state;
    }

    /**
     * Dispatch an action to the data store.
     *
     * @param action - The action(s) to dispatch to the store.
     *
     * #### Notes
     * An array of actions will be dispatched atomically.
     *
     * If an action causes an exception, the state will not be modified.
     *
     * The `changed` signal is emitted at most once per dispatch.
     */
    dispatch(action: IAction | IAction[]): void {
        // Disallow recursive dispatch.
        if (this._dispatching) {
            throw new Error('Recursive dispatch detected.');
        }

        // Set the dispatch guard.
        this._dispatching = true;

        // Set up the new state variable.
        let newState: S;

        // Invoke the reducer and compute the new state.
        try {
            if (Array.isArray(action)) {
                newState = Private.reduceMany(this._reducer, this._state, action);
            } else {
                newState = Private.reduceSingle(this._reducer, this._state, action);
            }
        } finally {
            this._dispatching = false;
        }

        // Bail early if there is no state change.
        if (this._state === newState) {
            return;
        }

        // Update the internal state.
        this._state = newState;

        // Emit the `changed` signal.
        this._changed.emit(undefined);
    }

    private _state: S;
    private _reducer: Reducer<S>;
    private _dispatching = false;
    private _changed = new Signal<this, void>(this);
}


/**
 * The namespace for the module implementation details.
 */
namespace Private {
    /**
     * Reduce a single action and return the new state.
     */
    export
    function reduceSingle<S>(reducer: Reducer<S>, state: S, action: IAction): S {
        return reducer(state, action);
    }

    /**
     * Reduce an array of actions and return the final state.
     */
    export
    function reduceMany<S>(reducer: Reducer<S>, state: S, actions: IAction[]): S {
        for (let i = 0, n = actions.length; i < n; ++i) {
            state = reducer(state, actions[i]);
        }
        return state;
    }
}

/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2017, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/


/**
 * A type alias for a reducer function.
 *
 * @param state - The current state of the application.
 *
 * @param action - The action to perform on the state.
 *
 * @returns The new state for the application.
 *
 * #### Notes
 * A reducer processes actions to update the data store state.
 */
export
type Reducer<S> = (state: S, action: IAction) => S;


/**
 * A type alias for a mapping of state branch to reducer.
 */
export
type ReducerMap<S> = { [K in keyof S]?: Reducer<S[K]>; };


/**
 * Create a single reducer from a mapping of reducers.
 *
 * @param reducers - A mapping of where each key is the name of a
 *   branch in the state object, and the value is a reducer to be
 *   applied to that branch.
 *
 * @returns A single combined reducer function.
 *
 * #### Notes
 * This function should only be used for state which is a vanilla
 * spreadable JS object.
 *
 * When the combined reducer is invoked, the new state is created by
 * applying each reducer in the map to its respective branch of the
 * state. State branches which are not included in the reducers map
 * are copied without modification into the result state.
 */
export
function combineReducers<S>(reducers: ReducerMap<S>): Reducer<S> {
    // https://github.com/Microsoft/TypeScript/issues/16780
    // Create a copy of the reducers map.
    reducers = { ...(reducers as any) } as ReducerMap<S>;

    // Return the combination reducer.
    return function combination(state: S, action: IAction): S {
        // https://github.com/Microsoft/TypeScript/issues/16780
        // Create a copy of the current state.
        let newState = { ...(state as any) } as S;

        // A flag tracking whether a change occurred.
        let changed = false;

        // Apply each reducer to the current state.
        for (let key in reducers) {
            // Look up the current reducer.
            let reducer = reducers[key];

            // Skip `undefined` reducers.
            if (!reducer) {
                continue;
            }

            // Look up the old state for the branch.
            let oldBranch = state[key];

            // Compute the new state for the branch.
            let newBranch = reducer(oldBranch, action);

            // Update the result state with the new branch.
            newState[key] = newBranch;

            // Update the changed flag.
            changed = changed || oldBranch !== newBranch;
        }

        // Return the new or old state based on the changed flag.
        return changed ? newState : state;
    }
}