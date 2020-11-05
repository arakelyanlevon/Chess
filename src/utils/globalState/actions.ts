import { Figure } from '../types'

export enum ActionTypes {
    SET_FIGURE = 'SET_FIGURE',
}

type Actions =
| { type: ActionTypes.SET_FIGURE; figure: Figure | null }

export type { Actions };
