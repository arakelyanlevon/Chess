import { Figure, FigureTypes, ColorTypes, Cell } from '../types';
import { createArray } from '../helpers'
import { getFigure } from './helpers';

type StateType = {
    allCells: Cell[]
}

const initialState: StateType = {
    allCells: createArray(8).map((_, i: number) => {
        return createArray(8).map((_, j: number) => {
            return {
                coords: { i, j },
                color: (i + j) % 2 === 0 ? ColorTypes.white : ColorTypes.black,
                figure: getFigure(i, j),
                selected: false,
                index: i * 8 + j
            };
        })
    }).flat(),
}

export { initialState };
export type { StateType };
