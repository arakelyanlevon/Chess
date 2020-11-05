import React, { FC } from 'react';
import styled from 'styled-components';

import styles from '../../resources/styles';
import constants from '../../resources/constants';
import { Cell } from '../Cell/Cell';

const Main = styled.div`
    width: ${styles.cell.width * constants.cell.count}px;
    height: ${styles.cell.height * constants.cell.count}px;
    display: flex;
    margin: auto;
`;

const Row = styled.div`
    width: 100%;
`;

export const Board:FC = () => {
    const getFigureById = (i: number, j: number): string => {
        if(i === 0 && (j === 0 || j === constants.cell.count - 1))
            return constants.figures.black.rook;
        else if(i === 0 && (j === 1 || j === constants.cell.count - 2))
            return constants.figures.black.knight;
        else if(i === 0 && (j === 2 || j === constants.cell.count - 3))
            return constants.figures.black.bishop;
        else if(i === 0 && j === 3 )
            return constants.figures.black.queen;
        else if(i === 0 && j === 4 )
            return constants.figures.black.king;
        else if(i === 1)
            return constants.figures.black.pawn;
        else if(i === constants.cell.count - 2)
            return constants.figures.white.pawn;
        else if(i === constants.cell.count - 1 && j === 3 )
            return constants.figures.white.queen;
        else if(i === constants.cell.count - 1 && j === 4 )
            return constants.figures.white.king;
        else if(i === constants.cell.count - 1 && (j === 0 || j === constants.cell.count - 1))
            return constants.figures.white.rook;
        else if(i === constants.cell.count - 1 && (j === 1 || j === constants.cell.count - 2))
            return constants.figures.white.knight;
        else if(i === constants.cell.count - 1 && (j === 2 || j === constants.cell.count - 3))
            return constants.figures.white.bishop;
        return constants.figures.none;
    };

    return (
        <Main>
            {Array.from(Array(constants.cell.count).keys()).map((_, j: number) => (
                <Row key={j}>
                    {Array.from(Array(constants.cell.count).keys()).map((_, i: number) => (
                        <Cell
                            key={`${i} ${j}`}
                            isWhite={(i + j) % 2 === 0}
                            figure={getFigureById(i, j)}
                            coords={{ i, j }}
                        />
                    ))}
                </Row>
            ))}
        </Main>
    );
};
