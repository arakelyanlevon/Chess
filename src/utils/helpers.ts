import { StateType } from './globalState/initialState';
import { Cell } from './types';

export const createArray = (length: number): number[] => {
    return Array.from(Array(length).keys());
}

export const getSelectedCell = (state: StateType) => {
    return state.allCells.find((cell: Cell) => cell.selected);
}