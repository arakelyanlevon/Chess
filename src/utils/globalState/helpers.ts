import { ColorTypes, Figure, FigureTypes } from "../types";

export const getFigure = (i: number, j: number): Figure | null => {
    if(i > 1 && i < 6) {
        return null;
    }
    const figure: Figure = {
        color: ColorTypes.black,
        type: FigureTypes.rook
    }

    if(i === 6 || i === 7) {
        figure.color = ColorTypes.white;
    }

    if(
        (i === 0 && (j === 1 || j === 6)) ||
        (i === 7 && (j === 1 || j === 6)) 
    ) {
        figure.type = FigureTypes.knight;
    } else if(
        (i === 0 && (j === 2 || j === 5)) ||
        (i === 7 && (j === 2 || j === 5)) 
    ) {
        figure.type = FigureTypes.bishop;
    } else if(j === 3 && (i === 0 || i === 7)) {
        figure.type = FigureTypes.queen;
    } else if(j === 4 && (i === 0 || i === 7)) {
        figure.type = FigureTypes.king;
    } else if(i === 1 || i === 6) {
        figure.type = FigureTypes.pawn;
    }

    return figure;
}