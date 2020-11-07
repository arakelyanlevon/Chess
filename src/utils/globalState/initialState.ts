import { ColorTypes, Cell } from '../types';
import { createArray } from '../helpers'
import { getFigure } from './helpers';

type StateType = {
    allCells: Cell[],
    selectedCell: Cell | null
}

const initialState: StateType = {
    allCells: createArray(8).map((_, i: number) => {
        return createArray(8).map((_, j: number) => {
            return {
                coords: { i, j },
                color: (i + j) % 2 === 0 ? ColorTypes.white : ColorTypes.black,
                figure: getFigure(i, j),
                index: i * 8 + j,
            };
        })
    }).flat(),
    selectedCell: null
}

export { initialState };
export type { StateType };
