type StateType = {
    isFigureSelected: boolean;
    currentFigure: HTMLImageElement | null;
}

const initialState: StateType = {
    isFigureSelected: false,
    currentFigure: null
}

export { initialState };
export type { StateType };
