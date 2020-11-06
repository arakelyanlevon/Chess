import styles from '../../resources/styles';

import { StateType } from '../../utils/globalState/initialState';
import { Coords, FigureTypes, ColorTypes, Figure, Cell } from '../../utils/types';
import constants from '../../resources/constants';
import { getSelectedCell } from '../../utils/helpers';

export const setWidth = (figureType: string): number => {
    if(figureType === constants.figures.white.pawn || figureType === constants.figures.black.pawn)
        return styles.cell.width - 30;
    else if(figureType === constants.figures.white.rook || figureType === constants.figures.black.rook)
        return styles.cell.width - 25;
    else if(figureType === constants.figures.white.knight || figureType === constants.figures.black.knight)
        return styles.cell.width - 15;
    else if(figureType === constants.figures.white.bishop || figureType === constants.figures.black.bishop)
        return styles.cell.width - 20;
    else if(figureType === constants.figures.white.queen || figureType === constants.figures.black.queen)
        return styles.cell.width - 15;
    return styles.cell.width - 15;
};

export const setHeight = (): number => {
    return styles.cell.height - 15;
};

export const setPossible = (state: StateType, coords: Coords): boolean => {
    const currentCell = state.allCells.find((cell: Cell) => {
        return cell.coords.i === coords.i && cell.coords.j === coords.j
    });

    if(currentCell?.figure) {
        return false;
    };

    const selectedCell = getSelectedCell(state);

    if(
        (!selectedCell) ||
        (coords.j === selectedCell?.coords?.j && coords.i === selectedCell?.coords?.i) ||
        (selectedCell?.figure?.color === ColorTypes.black)
    ){
        return false;
    }

    const figure: Figure | null = selectedCell.figure;
    switch(figure?.type) {
        case FigureTypes.rook:
            return coords.j === selectedCell.coords.j || coords.i === selectedCell.coords.i;
        case FigureTypes.knight:
            return (
                (Math.abs(coords.i - selectedCell.coords.i) === 2 && Math.abs(coords.j - selectedCell.coords.j) === 1) ||
                (Math.abs(coords.i - selectedCell.coords.i) === 1 && Math.abs(coords.j - selectedCell.coords.j) === 2)
            );
        case FigureTypes.bishop:
            return Math.abs(coords.i - selectedCell.coords.i) === Math.abs(coords.j - selectedCell.coords.j);
        case FigureTypes.queen:
            return (
                (coords.j === selectedCell.coords.j || coords.i === selectedCell.coords.i) ||
                (Math.abs(coords.i - selectedCell.coords.i) === Math.abs(coords.j - selectedCell.coords.j))
            );
        case FigureTypes.king:
            return (
                (Math.abs(coords.i - selectedCell.coords.i) === 1 && Math.abs(coords.j - selectedCell.coords.j) === 1) ||
                (coords.j === selectedCell.coords.j && Math.abs(coords.i - selectedCell.coords.i) === 1) ||
                (coords.i === selectedCell.coords.i && Math.abs(coords.j - selectedCell.coords.j) === 1)
            )
        case FigureTypes.pawn:
            return coords.j === selectedCell.coords.j && (selectedCell.coords.i !== 6 ?
                selectedCell.coords.i - coords.i === 1 :
                selectedCell.coords.i - coords.i === 1  || selectedCell.coords.i - coords.i === 2
            )
        default:
            return false;
    }
}

export const getCellIndex = (coords: Coords, allCells: Cell[]): number | null => {
    let foundIndex: number | null = null;
    for(let i = 0; i < allCells.length; i++) {
        const cell = allCells[i];
        if(cell.coords.i === coords.i && cell.coords.j === coords.j) {
            foundIndex = i;
            break;
        }
    }

    return foundIndex;
}
