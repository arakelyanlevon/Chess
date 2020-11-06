import { Figure } from '../types'

export enum ActionTypes {
    SELECT_FIGURE = 'SELECT_FIGURE',
    SET_FIGURE = 'CHANGE_COORDS'
}

type Actions =
| { type: ActionTypes.SELECT_FIGURE; index: number }
| { type: ActionTypes.SET_FIGURE; newIndex: number; oldIndex: number; figure: Figure | null }

export type { Actions };
