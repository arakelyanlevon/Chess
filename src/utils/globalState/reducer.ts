import { ActionTypes, Actions } from './actions';
import { StateType } from './initialState';

const reducer = (state: StateType, action: Actions): StateType => {
    switch(action.type) {
        case ActionTypes.SET_FIGURE:
            return {
                ...state,
                currentFigure: action.figure,
            }
        default:
            throw new Error('Unknown action: ' + action);
    }
}

export default reducer;
