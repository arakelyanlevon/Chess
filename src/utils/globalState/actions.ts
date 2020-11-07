import { Cell } from '../types'

export enum ActionTypes {
    SELECT_FIGURE = 'SELECT_FIGURE',
    SET_FIGURE = 'SET_FIGURE'
}

type Actions =
| { type: ActionTypes.SELECT_FIGURE; cell: Cell | null }
| { type: ActionTypes.SET_FIGURE; cell: Cell | null}

export type { Actions };
