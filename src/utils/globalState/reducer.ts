import { ActionTypes, Actions } from './actions';
import { StateType } from './initialState';

const reducer = (state: StateType, action: Actions): StateType => {
    const { isFigureSelected, currentFigure } = state;
    switch(action.type) {
        case ActionTypes.SET_IS_FIGURE_SELECTED:
            return {
                isFigureSelected: action.isSelected,
                currentFigure
            };
        case ActionTypes.SET_FIGURE:
            return {
                currentFigure: action.figure,
                isFigureSelected
            }
        default:
            throw new Error('Unknown action: ' + action);
    }
}

export default reducer;
