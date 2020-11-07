import React, { FC } from 'react';
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
import { Coords, Cell, Figure } from '../../utils/types';
import { ContextProps, useGlobalState }from '../../utils/globalState/useGlobalState';
import { ActionTypes } from '../../utils/globalState/actions';
import styles from '../../resources/styles';
import * as helpers from './helpers';
import { getMyColor, isSameCoords } from '../../utils/helpers';

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
    isWhite: boolean,
    coords: Coords,
    figure: Figure | null
}

export const Square:FC<Props> = ({ isWhite, figure, coords }: Props) => {
    const { state, dispatch }: ContextProps = useGlobalState();

    const isPossible: boolean = !!state.selectedCell?.figure?.control.find((controlCoords: Coords) => {
        return isSameCoords(controlCoords, coords);
    });

    const takeFigure = (): void => {
        if(figure?.color === getMyColor()) {
            const currentCell: Cell | null = helpers.getCellByCoords(coords, state.allCells);
            dispatch({ type: ActionTypes.SELECT_FIGURE, cell: currentCell });
        }
    }

    const setFigure = () => {
        const cell: Cell | null = helpers.getCellByCoords(coords, state.allCells);
        if(cell && state.selectedCell && isPossible) {
            cell.figure = state.selectedCell.figure;
            dispatch({ type: ActionTypes.SET_FIGURE, cell: cell })
        }
    }

    return (
        <Main
            className='cell'
            theme={{isWhite, isPossible}}
            onClick={() => state.selectedCell ? setFigure() : takeFigure()}
        >
            {figure &&
                <FigureImg
                    /* @ts-ignore */
                    src={figures[`${figure.color}_${figure.type}`]}
                    alt={`${figure.color} ${figure.type}`}
                    width={helpers.setWidth(figure.type)}
                    height={helpers.setHeight()}
                />
            }
        </Main>
    );
};
