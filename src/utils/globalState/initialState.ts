import { Figure, FigureTypes, ColorTypes } from '../types';

type StateType = {
    allFigures: Figure[]
    currentFigure: Figure | null
}

const initialState: StateType = {
    allFigures: Array.from(Array(32).keys()).map((_, index: number) => {
        const figure: Figure = {
            coords: { i: 0, j: index % 8 },
            type: FigureTypes.rook,
            color: ColorTypes.black
        }

        if(index >= 8 && index <= 15) {
            figure.coords.i = 1
            figure.type = FigureTypes.pawn;
        } else if(index >= 16 && index <= 23) {
            figure.coords.i = 6
            figure.color = ColorTypes.white;
            figure.type = FigureTypes.pawn;
        } else if(index >= 24){
            figure.coords.i = 7
            figure.color = ColorTypes.white;
        }

        if(index === 1 || index === 6 || index === 25 || index === 30) {
            figure.type = FigureTypes.knight;
        } else if(index === 2 || index === 5 || index === 26 || index === 29) {
            figure.type = FigureTypes.bishop;
        } else if(index === 3 || index === 27) {
            figure.type = FigureTypes.queen;
        } else if(index === 4 || index === 28) {
            figure.type = FigureTypes.king;
        }

        return figure;
    }),
    currentFigure: null
}

export { initialState };
export type { StateType };
