import React, { FC, useState, useRef, useCallback, RefObject } from 'react';
import styled from 'styled-components';

import blackBishop from '../../images/figures/black/blackBishop.png';
import blackKing from '../../images/figures/black/blackKing.png';
import blackKnight from '../../images/figures/black/blackKnight.png';
import blackPawn from '../../images/figures/black/blackPawn.png';
import blackQueen from '../../images/figures/black/blackQueen.png';
import blackRook from '../../images/figures/black/blackRook.png';
import whiteBishop from '../../images/figures/white/whiteBishop.png';
import whiteKing from '../../images/figures/white/whiteKing.png';
import whiteKnight from '../../images/figures/white/whiteKnight.png';
import whitePawn from '../../images/figures/white/whitePawn.png';
import whiteQueen from '../../images/figures/white/whiteQueen.png';
import whiteRook from '../../images/figures/white/whiteRook.png';
import constants from '../../resources/constants';
import { ColorTypes, Coords, Cell } from '../../utils/types';
import { ContextProps, useGlobalState }from '../../utils/globalState/useGlobalState';
import { ActionTypes } from '../../utils/globalState/actions';
import styles from '../../resources/styles';
import * as helpers from './helpers';
import { getSelectedCell } from '../../utils/helpers';

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


const Main = styled.div`
    width: ${styles.cell.width}px;
    height: ${styles.cell.height}px;
    background-color: ${({theme}) => {
        if(theme.isPossible) {
            return styles.cell.colors[theme.isWhite ? 'possibleLight' : 'possibleDark']
        }
        return styles.cell.colors[theme.isWhite ? 'light' : 'dark']
    }};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FigureImg = styled.img`
    z-index: 0;
`;

type Props = {
    figure: string,
    isWhite: boolean,
    coords: Coords
}

export const Square:FC<Props> = ({ isWhite, figure, coords }) => {
    const { state, dispatch }: ContextProps = useGlobalState();

    const color: string = figure.split('_')[0];

    const selectedCell: Cell | undefined = getSelectedCell(state);
    const isPossible: boolean = helpers.setPossible(state, coords);

    const takeFigure = (): void => {
        if(color === ColorTypes.white) {
            const foundIndex: number | null = helpers.getCellIndex(coords, state.allCells);
            dispatch({ type: ActionTypes.SELECT_FIGURE, index: foundIndex || -1 });
        }
    }

    const setFigure = () => {
        const clickedSameSquare = selectedCell?.coords.i === coords.i && selectedCell?.coords.j === coords.j;
        if( selectedCell && (isPossible || clickedSameSquare)) {
            const foundIndex: number | null = helpers.getCellIndex(coords, state.allCells);
            dispatch({
                type: ActionTypes.SET_FIGURE,
                oldIndex: selectedCell?.index || -1,
                newIndex: foundIndex || -1,
                figure: selectedCell?.figure || null
            });
        }
    }

    return (
        <Main
            className='cell'
            theme={{isWhite, isPossible}}
            onClick={() => selectedCell ? setFigure() : takeFigure()}
        >
            {figure !== constants.figures.none && 
            <FigureImg
                /* @ts-ignore */
                src={figures[figure]}
                alt={figure}
                width={helpers.setWidth(figure)}
                height={helpers.setHeight()}
            />}
        </Main>
    );
};
