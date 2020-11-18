import React, { FC } from 'react';

import { Square } from '../Square/Square';
import { useGlobalState } from '../../../utils/globalState/useGlobalState';
import { Cell, ColorTypes } from '../../../utils/types';
import { createArray, getMyColor, isSameCoords } from '../../../utils/helpers';
import { Main, Row, ID } from './styles';
import constants from '../../../resources/constants';

export const Board:FC = () => {
    const { state } = useGlobalState();
    
    return (
        <Main>
            <Row>
                <ID theme={{ isWidthLonger: false, isHeightLonger: false }}></ID>
                {createArray(8).map((_, i: number) => (
                    <ID key={`id1${i}`} theme={{ isWidthLonger: true }}>
                        {getMyColor() === ColorTypes.white ? constants.letters[i] : constants.letters.slice().reverse()[i]}
                    </ID>
                ))}
                <ID theme={{ isWidthLonger: false, isHeightLonger: false }}></ID>
            </Row>
            {createArray(8).map((_, i: number) => (
                <Row key={i}>
                    <ID theme={{ isHeightLonger: true }}>
                        {getMyColor() === ColorTypes.black ? constants.numbers[i] : constants.numbers.slice().reverse()[i]}
                    </ID>
                    {createArray(8).map((_, j: number) => {
                        const cell = state.allCells.find((cell: Cell) => isSameCoords(cell.coords, { i, j }));
                        return <Square
                            key={`${i} ${j}`}
                            isWhite={(i + j) % 2 === 0}
                            coords={{ i, j }}
                            figure={cell?.figure || null}
                        />
                    })}
                    <ID theme={{ isHeightLonger: true }}>
                        {getMyColor() === ColorTypes.black ? constants.numbers[i] : constants.numbers.slice().reverse()[i]}
                    </ID>
                </Row>
            ))}
            <Row>
                <ID theme={{ isWidthLonger: false, isHeightLonger: false }}></ID>
                {createArray(8).map((_, i: number) => (
                    <ID  key={`id1${i}`} theme={{ isWidthLonger: true }}>
                        {getMyColor() === ColorTypes.white ? constants.letters[i] : constants.letters.slice().reverse()[i]}
                    </ID>
                ))}
                <ID theme={{ isWidthLonger: false, isHeightLonger: false }}></ID>
            </Row>
        </Main>
    );
};
