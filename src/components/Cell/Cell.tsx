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
import { ColorTypes, Coords } from '../../utils/types';
import { ContextProps, useGlobalState }from '../../utils/globalState/useGlobalState';
import { ActionTypes } from '../../utils/globalState/actions';
import styles from '../../resources/styles';
import * as helpers from './helpers';

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


export const Main = styled.div`
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

type Props = {
    figure: string,
    isWhite: boolean,
    coords: Coords
}

export const Cell:FC<Props> = ({ isWhite, figure, coords }) => {
    const { state, dispatch }: ContextProps = useGlobalState();
    const [ isFigureSelected, setFigureSelected ] = useState<boolean>(false);

    const currentFigureRef:RefObject<HTMLImageElement> = useRef<HTMLImageElement>(null);
    const color: string = figure.split('_')[0];
    const type: string = figure.split('_')[1];
    const isPossible: boolean = helpers.setPossible(state, coords);

    const takeFigure = (): void => {
        if(!isFigureSelected && !state.currentFigure && color !== ColorTypes.black) {
            window.addEventListener('mousemove', moveFigure);
            dispatch({type: ActionTypes.SET_FIGURE, figure: state.allFigures.find(figure => {
                return (
                    figure.type === type &&
                    figure.color === color &&
                    figure.coords.i === coords.i &&
                    figure.coords.j === coords.j
                );
            }) || null});
        }
        if(isFigureSelected){
            window.removeEventListener('mousemove', moveFigure);
            dispatch({type: ActionTypes.SET_FIGURE, figure: null})
        }
        setFigureSelected(!isFigureSelected);
    }
    const moveFigure = useCallback((e: any) => {
        if(currentFigureRef.current) {
            currentFigureRef.current.style.top = e.clientY - currentFigureRef.current.height / 2 + 'px';
            currentFigureRef.current.style.left = e.clientX - currentFigureRef.current.width / 2 + 'px';
        }
    }, []);
    
    return (
        <Main
            theme={{isWhite, isPossible}}   
        >
            {figure !== constants.figures.none && 
            <img
                /* @ts-ignore */
                src={figures[figure]}
                alt={figure}
                width={helpers.setWidth(figure)}
                height={helpers.setHeight()}
                style={{position: 'absolute'}}
                onClick={takeFigure}
                ref={currentFigureRef}
                className={`${coords.i} ${coords.j}`}
            />}
        </Main>
    );
};
