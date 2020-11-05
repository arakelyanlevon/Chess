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
    coords: Coords,
    type: FigureTypes.rook
    | FigureTypes.knight
    | FigureTypes.bishop
    | FigureTypes.queen
    | FigureTypes.king
    | FigureTypes.pawn,
    color: ColorTypes.black
    | ColorTypes.white
}