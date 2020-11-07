import styles from '../../resources/styles';

import { Coords, Cell, FigureTypes } from '../../utils/types';
import { isSameCoords } from '../../utils/helpers';

export const setWidth = (figureType: FigureTypes): number => {
    if(figureType === FigureTypes.pawn)
        return styles.cell.width - 30;
    else if(figureType === FigureTypes.rook)
        return styles.cell.width - 25;
    else if(figureType === FigureTypes.knight)
        return styles.cell.width - 15;
    else if(figureType === FigureTypes.bishop)
        return styles.cell.width - 20;
    else if(figureType === FigureTypes.queen)
        return styles.cell.width - 15;
    return styles.cell.width - 15;
};

export const setHeight = (): number => {
    return styles.cell.height - 15;
};

export const getCellByCoords = (coords: Coords, allCells: Cell[]): Cell | null => {
    for(let i = 0; i < allCells.length; i++) {
        const cell = allCells[i];
        if(isSameCoords(cell.coords, coords)) {
            return cell;
        }
    }

    return null;
}
