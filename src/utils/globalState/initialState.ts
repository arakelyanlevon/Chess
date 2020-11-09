import { ColorTypes, Cell } from '../types';
import { createArray } from '../helpers'
import { getFigure } from './helpers';

type StateType = {
    allCells: Cell[],
    selectedCell: Cell | null
}

const allCells = createArray(8).map((_, i: number) => {
    return createArray(8).map((_, j: number) => {
        return {
            coords: { i, j },
            color: (i + j) % 2 === 0 ? ColorTypes.white : ColorTypes.black,
            figure: null,
            index: i * 8 + j,
        };
    })
}).flat();

allCells.forEach((cell: Cell, index: number): void => {
    cell.figure = getFigure(Math.trunc(index / 8), index % 8, allCells);
})

const initialState: StateType = {
    allCells: allCells,
    selectedCell: null
}

export { initialState };
export type { StateType };
