import { Cell, ColorTypes, Coords, FigureTypes } from './types';

export const createArray = (length: number): number[] => {
    return Array.from(Array(length).keys());
}

export const getMyColor = (): ColorTypes.black | ColorTypes.white => {
    return ColorTypes.white;
}

export const getEnemyColor = (): ColorTypes.black | ColorTypes.white => {
    return ColorTypes.black;
}

export const isSameCoords = (coords1: Coords | null | undefined, coords2: Coords | null | undefined): boolean => {
    if(!coords1 || !coords2) {
        return false;
    }

    return coords1.i === coords2.i && coords1.j === coords2.j;
}

export const getCellByCoords = (allCells: Cell[], { i, j }: Coords): Cell | undefined => {
    return allCells.find((cell: Cell) => isSameCoords({i, j}, cell.coords));
}

export const getControlledCells = (figure: FigureTypes | null, coords: Coords, allCells: Cell[]): Coords[] => {
    const cells: Coords[] = [];
    const helpers = {
        rook: (start: number, end: number, dynamic: number): void => {
            for(let x = start; end === 0 ? x >= 0 : x < 8; end === 0 ? x-- : x++) {
                const cellCoords: Coords = dynamic === 1 ? { i: coords.i, j: x } : { i: x, j: coords.j };
                const cell = getCellByCoords(allCells, cellCoords);
                if(cell?.figure?.color === getMyColor()) {
                    break;
                }
                cells.push(cellCoords);
                if(cell?.figure?.color === getEnemyColor()) {
                    break;
                }
            }
        },
        knight: ({ i, j }: Coords): void => {
            if(getCellByCoords(allCells, { i, j })?.figure?.color !== getMyColor()) {
                cells.push({ i, j });
            }
        },
        bishop: (jStart: number, jChange: number, iStart: number, iEnd: number): void => {
            let j = jStart;
            for(let i = iStart; iEnd === 0 ? i >= 0 : i < 8; iEnd === 0 ? i-- : i++) {
                const cell = getCellByCoords(allCells, {i, j});
                if(cell?.figure?.color === getMyColor()) {
                    break;
                }
                cells.push({i, j});
                if(cell?.figure?.color === getEnemyColor()) {
                    break;
                }
                j += jChange;
            }
        },
        king: ({ i, j }: Coords): void => {
            let isPossible = true;
            for(let x = 0; x < allCells.length; x++) {
                const cell = allCells[x];
                if(
                    cell.figure?.control.find((cellCoords: Coords) => isSameCoords(cellCoords, { i, j })) &&
                    cell.figure.color === getEnemyColor()
                ) {
                    isPossible = false;
                    break;
                }
            }

            if(isPossible && getCellByCoords(allCells, { i, j })?.figure?.color === getMyColor()) {
                isPossible = false;
            }
            if(isPossible) {
                cells.push({ i, j })
            }
        },
        pawn: ({ i, j }: Coords) => {
            const cell: Cell | undefined = getCellByCoords(allCells, { i, j });
            if(
                (cell?.figure && j === coords.j) ||
                (!cell?.figure && j !== coords.j)
            ) {
                return;
            }

            if(
                (
                    (coords.i === 6) &&
                    (coords.i - i === 2) &&
                    (!getCellByCoords(allCells, { i: coords.i - 1, j: coords.j })?.figure)
                ) ||
                (coords.i - i === 1 && j === coords.j) ||
                (cell?.figure?.color === getEnemyColor())
            ) {
                cells.push({ i, j });
            }
        }
    };

    switch(figure) {
        case FigureTypes.rook:
            helpers.rook(coords.j - 1, 0, 1);
            helpers.rook(coords.j + 1, 8, 1);
            helpers.rook(coords.i - 1, 0, 0);
            helpers.rook(coords.i + 1, 8, 0);
            break;
        case FigureTypes.knight:
            helpers.knight({i: coords.i - 2, j: coords.j + 1 });
            helpers.knight({i: coords.i - 2, j: coords.j - 1 });
            helpers.knight({i: coords.i - 1, j: coords.j + 2 });
            helpers.knight({i: coords.i - 1, j: coords.j - 2 });
            helpers.knight({i: coords.i + 2, j: coords.j + 1 });
            helpers.knight({i: coords.i + 2, j: coords.j - 1 });
            helpers.knight({i: coords.i + 1, j: coords.j + 2 });
            helpers.knight({i: coords.i + 1, j: coords.j - 2 });
            break;
        case FigureTypes.bishop:
            helpers.bishop(coords.j + 1, 1, coords.i - 1, 0);
            helpers.bishop(coords.j + 1, 1, coords.i + 1, 8);
            helpers.bishop(coords.j - 1, -1, coords.i - 1, 0);
            helpers.bishop(coords.j - 1, -1, coords.i + 1, 8);
            break;
        case FigureTypes.queen:
            helpers.rook(coords.j - 1, 0, 1);
            helpers.rook(coords.j + 1, 8, 1);
            helpers.rook(coords.i - 1, 0, 0);
            helpers.rook(coords.i + 1, 8, 0);
            helpers.bishop(coords.j + 1, 1, coords.i - 1, 0);
            helpers.bishop(coords.j + 1, 1, coords.i + 1, 8);
            helpers.bishop(coords.j - 1, -1, coords.i - 1, 0);
            helpers.bishop(coords.j - 1, -1, coords.i + 1, 8);
            break;
        case FigureTypes.king:
            helpers.king({i: coords.i - 1, j: coords.j - 1});
            helpers.king({i: coords.i - 1, j: coords.j});
            helpers.king({i: coords.i - 1, j: coords.j + 1});
            helpers.king({i: coords.i, j: coords.j - 1});
            helpers.king({i: coords.i, j: coords.j + 1});
            helpers.king({i: coords.i + 1, j: coords.j - 1});
            helpers.king({i: coords.i + 1, j: coords.j});
            helpers.king({i: coords.i + 1, j: coords.j + 1});
            break;
        case FigureTypes.pawn:
            helpers.pawn({i: coords.i - 1, j: coords.j});
            helpers.pawn({i: coords.i - 2, j: coords.j});
            helpers.pawn({i: coords.i - 1, j: coords.j - 1});
            helpers.pawn({i: coords.i - 1, j: coords.j + 1});
            break;
    }
    
    return cells;
}
