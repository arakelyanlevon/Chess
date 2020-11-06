export enum FigureTypes {
    rook = 'rook',
    knight = 'knight',
    bishop = 'bishop',
    queen = 'queen',
    king = 'king',
    pawn = 'pawn'
}

export enum ColorTypes {
    black = 'black',
    white = 'white'
}

export type Coords = {
    i: number,
    j: number
}

export type Figure = {
    type: FigureTypes.rook
    | FigureTypes.knight
    | FigureTypes.bishop
    | FigureTypes.queen
    | FigureTypes.king
    | FigureTypes.pawn,
    color: ColorTypes.black | ColorTypes.white
}

export type Cell = {
    coords: Coords,
    color: ColorTypes.black | ColorTypes.white,
    figure: Figure | null,
    selected: boolean,
    index: number
}