import React, { FC } from 'react';
import styled from 'styled-components';

import styles from '../../resources/styles';
import constants from '../../resources/constants';
import { Square } from '../Square/Square';
import { useGlobalState } from '../../utils/globalState/useGlobalState';
import { Cell } from '../../utils/types';
import { createArray } from '../../utils/helpers';

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
    const { state } = useGlobalState();
    
    return (
        <Main>
            {createArray(8).map((_, j: number) => (
                <Row key={j}>
                    {createArray(8).map((_, i: number) => {
                        const cell = state.allCells.find((cell: Cell) => cell.coords.i === i && cell.coords.j === j);
                        return <Square
                            key={`${i} ${j}`}
                            isWhite={(i + j) % 2 === 0}
                            coords={{ i, j }}
                            figure={cell?.figure || null}
                        />
                    })}
                </Row>
            ))}
        </Main>
    );
};
