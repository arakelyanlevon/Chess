import { StateType } from '../globalState/initialState';

const moveFigure = (state: StateType) => {
    document.addEventListener('mousemove', (e: MouseEvent): void => {
        if(state.currentFigure && state.isFigureSelected) {
            state.currentFigure.style.top = e.clientY - state.currentFigure.height / 2 + 'px';
            state.currentFigure.style.left = e.clientX - state.currentFigure.width / 2 + 'px';
        }
    });
}

export default moveFigure;
