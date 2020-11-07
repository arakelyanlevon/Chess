import { ColorTypes, Coords, FigureTypes } from './types';

export const createArray = (length: number): number[] => {
    return Array.from(Array(length).keys());
}

export const getMyColor = (): ColorTypes.black | ColorTypes.white => {
    return ColorTypes.black;
}

export const getEnemyColor = (): ColorTypes.black | ColorTypes.white => {
    return ColorTypes.white;
}

export const isSameCoords = (coords1: Coords | null | undefined, coords2: Coords | null | undefined): boolean => {
    if(!coords1 || !coords2) {
        return false;
    }

    return coords1.i === coords2.i && coords1.j === coords2.j;
}

export const getControlledCells = (figure: FigureTypes | null, coords: Coords): Coords[] => {
    const cells: Coords[] = [];
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            switch(figure) {
                case FigureTypes.rook:
                    if(i === coords.i || j === coords.i) {
                        cells.push({ i, j });
                    }
                    break;
                case FigureTypes.knight:
                    if (
                        (Math.abs(i - coords.i) === 2 && Math.abs(j - coords.j) === 1) ||
                        (Math.abs(i - coords.i) === 1 && Math.abs(j - coords.j) === 2)
                    ) {
                        cells.push({ i, j });
                    }
                    break;
                case FigureTypes.bishop:
                    if(Math.abs(i - coords.i) === Math.abs(j - coords.j)) {
                        cells.push({ i, j });
                    }
                    break;
                case FigureTypes.queen:
                    if (
                        (j === coords.j || i === coords.i) ||
                        (Math.abs(i - coords.i) === Math.abs(j - coords.j))
                    ) {
                        cells.push({ i, j });
                    }
                    break;
                case FigureTypes.king:
                    if (
                        (Math.abs(i - coords.i) === 1 && Math.abs(j - coords.j) === 1) ||
                        (j === coords.j && Math.abs(i - coords.i) === 1) ||
                        (i === coords.i && Math.abs(j - coords.j) === 1)
                    ) {
                        cells.push({ i, j });
                    }
                    break;
                case FigureTypes.pawn:
                    if(
                        j === coords.j &&
                        (coords.i !== 6 ?
                            coords.i - i === 1 :
                            coords.i - i === 1  || coords.i - i === 2
                        )
                    ) {
                        cells.push({ i, j });
                    }
                    break;
            }
            
        }
    }
    
    return cells;
}
