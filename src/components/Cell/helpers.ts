import styles from '../../resources/styles';

import { StateType } from '../../utils/globalState/initialState';
import { Coords, FigureTypes, ColorTypes } from '../../utils/types';
import constants from '../../resources/constants';

export const setPossible = (state: StateType, coords: Coords): boolean => {
    if(
        (!state.currentFigure) ||
        (coords.j === state.currentFigure?.coords?.j && coords.i === state.currentFigure?.coords?.i) ||
        (state.currentFigure?.color === ColorTypes.black)
    ){
        return false;
    }

    const figure = state.currentFigure;
    switch(figure.type) {
        case FigureTypes.rook:
            return coords.j === figure.coords.j || coords.i === figure.coords.i;
        case FigureTypes.knight:
            return (
                (Math.abs(coords.i - figure.coords.i) === 2 && Math.abs(coords.j - figure.coords.j) === 1) ||
                (Math.abs(coords.i - figure.coords.i) === 1 && Math.abs(coords.j - figure.coords.j) === 2)
            );
        case FigureTypes.bishop:
            return Math.abs(coords.i - figure.coords.i) === Math.abs(coords.j - figure.coords.j);
        case FigureTypes.queen:
            return (
                (coords.j === figure.coords.j || coords.i === figure.coords.i) ||
                (Math.abs(coords.i - figure.coords.i) === Math.abs(coords.j - figure.coords.j))
            );
        case FigureTypes.king:
            return (
                (Math.abs(coords.i - figure.coords.i) === 1 && Math.abs(coords.j - figure.coords.j) === 1) ||
                (coords.j === figure.coords.j && Math.abs(coords.i - figure.coords.i) === 1) ||
                (coords.i === figure.coords.i && Math.abs(coords.j - figure.coords.j) === 1)
            )
        case FigureTypes.pawn:
            return coords.j === figure.coords.j && (figure.coords.i !== 6 ?
                figure.coords.i - coords.i === 1 :
                figure.coords.i - coords.i === 1  || figure.coords.i - coords.i === 2
            )
        default:
            return false;
    }
}

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