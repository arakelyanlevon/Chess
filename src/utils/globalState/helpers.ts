import { Cell, Coords, Figure, FigureTypes } from "../types";
import { getControlledCells, getEnemyColor, getMyColor } from "../helpers";

const getType = (i: number, j: number): FigureTypes => {
    if(
        (j === 0 || j === 7) &&
        (i === 0 || i === 7)
    ) {
        return FigureTypes.rook;
    } else if(
        (i === 0 && (j === 1 || j === 6)) ||
        (i === 7 && (j === 1 || j === 6)) 
    ) {
        return FigureTypes.knight;
    } else if(
        (i === 0 && (j === 2 || j === 5)) ||
        (i === 7 && (j === 2 || j === 5)) 
    ) {
        return FigureTypes.bishop;
    } else if(j === 3 && (i === 0 || i === 7)) {
        return FigureTypes.queen;
    } else if(j === 4 && (i === 0 || i === 7)) {
        return FigureTypes.king;
    }

    return FigureTypes.pawn;
}

const getControl = ({ i, j }: Coords): Coords[] => {
    if(i === 6) {
        return [{
            i: 5, j
        }, {
            i: 4, j
        }];
    } else if(i === 7 && j === 1) {
        return [{
            i: 5, j: 0
        }, {
            i: 5, j: 2
        }];
    } else if(i === 7 && j === 6) {
        return [{
            i: 5, j: 5
        }, {
            i: 5, j: 7
        }]
    } else {
        return [];
    }
}

export const getFigure = (i: number, j: number, allCells: Cell[]): Figure | null => {
    if(i > 1 && i < 6) {
        return null;
    }

    const color = i === 6 || i === 7 ? getMyColor() : getEnemyColor();
    const type = getType(i, j);
    const control = getControl({i, j});

    return { color, type, control };
}
