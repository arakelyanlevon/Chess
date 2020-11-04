export enum ActionTypes {
    SET_IS_FIGURE_SELECTED = 'SET_IS_FIGURE_SELECTED',
    SET_FIGURE = 'SET_FIGURE'
}

type Actions =
| { type: ActionTypes.SET_IS_FIGURE_SELECTED; isSelected: boolean }
| { type: ActionTypes.SET_FIGURE; figure: HTMLImageElement | null }

export type { Actions };
