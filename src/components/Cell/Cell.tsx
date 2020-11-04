import React, { FC, useState, useRef, useCallback } from 'react';
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
import styles from '../../resources/styles';
import constants from '../../resources/constants';

const figures = {
    blackBishop,
    blackKing,
    blackKnight,
    blackPawn,
    blackQueen,
    blackRook,
    whiteBishop,
    whiteKing,
    whiteKnight,
    whitePawn,
    whiteQueen,
    whiteRook
};

interface Coords {
    top: string | undefined;
    left: string | undefined;
}

interface Props {
    figure: string;
    isWhite: boolean;
}

const Main = styled.div`
    width: ${styles.cell.width}px;
    height: ${styles.cell.height}px;
    background-color: ${props => styles.common.colors[props.theme.isWhite ? 'white' : 'black']};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Cell:FC<Props> = ({ isWhite, figure }) => {
    const [isFigureSelected, setFigureSelected] = useState<boolean>(false);
    const currentFigure = useRef<HTMLImageElement>(null);

    const setWidth = (figureType: string): number => {
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

    const setHeight = (): number => {
        return styles.cell.height - 15;
    };

    const takeFigure = (): void => {
        if(!isFigureSelected) {
            window.addEventListener('mousemove', moveFigure);
            
        } else {
            window.removeEventListener('mousemove', moveFigure);
        }
        setFigureSelected(!isFigureSelected);
    }
    const moveFigure = useCallback((e: any) => {
        if(currentFigure.current) {
            currentFigure.current.style.top = e.clientY - currentFigure.current.height / 2 + 'px';
            currentFigure.current.style.left = e.clientX - currentFigure.current.width / 2 + 'px';
        }
    }, []);
    
    return (
        <Main
            theme={{isWhite}}   
        >
            {figure !== constants.figures.none && 
            <img
                /* @ts-ignore */
                src={figures[figure]}
                alt={figure}
                width={setWidth(figure)}
                height={setHeight()}
                style={{position: 'absolute'}}
                onClick={takeFigure}
                ref={currentFigure}
            />}
        </Main>
    );
};
