import React, { FC } from 'react';

import blackBishop from '../../../images/figures/black/blackBishop.png';
import blackKing from '../../../images/figures/black/blackKing.png';
import blackKnight from '../../../images/figures/black/blackKnight.png';
import blackPawn from '../../../images/figures/black/blackPawn.png';
import blackQueen from '../../../images/figures/black/blackQueen.png';
import blackRook from '../../../images/figures/black/blackRook.png';
import whiteBishop from '../../../images/figures/white/whiteBishop.png';
import whiteKing from '../../../images/figures/white/whiteKing.png';
import whiteKnight from '../../../images/figures/white/whiteKnight.png';
import whitePawn from '../../../images/figures/white/whitePawn.png';
import whiteQueen from '../../../images/figures/white/whiteQueen.png';
import whiteRook from '../../../images/figures/white/whiteRook.png';
import { Coords, Cell, Figure } from '../../../utils/types';
import { ContextProps, useGlobalState } from '../../../utils/globalState/useGlobalState';
import { ActionTypes } from '../../../utils/globalState/actions';
import { FigureImg, Main } from './styles';
import * as helpers from './helpers';
import { getCellByCoords, getMyColor, isSameCoords } from '../../../utils/helpers';

const figures = {
    black_bishop: blackBishop,
    black_king: blackKing,
    black_knight: blackKnight,
    black_pawn: blackPawn,
    black_queen: blackQueen,
    black_rook: blackRook,
    white_bishop: whiteBishop,
    white_king: whiteKing,
    white_knight: whiteKnight,
    white_pawn: whitePawn,
    white_queen: whiteQueen,
    white_rook: whiteRook
};


type Props = {
    isWhite: boolean,
    coords: Coords,
    figure: Figure | null
}

export const Square:FC<Props> = ({ isWhite, figure, coords }) => {
    const { state, dispatch }: ContextProps = useGlobalState();

    const isPossible: boolean = !!state.selectedCell?.figure?.control.find((controlCoords: Coords) => {
        return isSameCoords(controlCoords, coords);
    });

    const takeFigure = (): void => {
        if(figure?.color === getMyColor()) {
            const currentCell: Cell | undefined = getCellByCoords(state.allCells, coords);
            dispatch({ type: ActionTypes.SELECT_FIGURE, cell: currentCell || null});
        }
    }

    const setFigure = () => {
        const cell: Cell | undefined = getCellByCoords(state.allCells, coords);
        if(cell && state.selectedCell && (isPossible  || isSameCoords(coords, state.selectedCell?.coords))) {
            cell.figure = state.selectedCell.figure;
            dispatch({ type: ActionTypes.SET_FIGURE, cell: cell || null });
        }
    }

    return (
        <Main
            className='cell'
            theme={{ isWhite, isPossible, isSelected: isSameCoords(state.selectedCell?.coords, coords) }}
            onClick={() => state.selectedCell ? setFigure() : takeFigure()}
            key={`cell${coords.i}${coords.j}`}
        >
            {figure &&
                <FigureImg
                    /* @ts-ignore */
                    src={figures[`${figure.color}_${figure.type}`]}
                    alt={`${figure.color} ${figure.type}`}
                    width={helpers.setWidth(figure.type)}
                    height={helpers.setHeight()}
                    key={`img${coords.i}${coords.j}`}
                />
            }
        </Main>
    );
};
