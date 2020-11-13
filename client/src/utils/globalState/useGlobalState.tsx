import { createContext, useContext, Dispatch } from 'react';
import { StateType } from './initialState';
import { Actions } from './actions';

export type ContextProps = {
    state: StateType;
    dispatch: Dispatch<Actions>;
}

export const Context = createContext({} as ContextProps);

export const useGlobalState = () => {
    return useContext(Context);
}
