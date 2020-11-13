import styled from 'styled-components';
import styles from '../../../resources/styles';

export const Main = styled.div`
    width: ${styles.cell.width}px;
    height: ${styles.cell.height}px;
    background-color: ${({theme}) => {
        if(theme.isPossible) {
            return styles.cell.colors[theme.isWhite ? 'possibleLight' : 'possibleDark']
        }
        return styles.cell.colors[theme.isWhite ? 'light' : 'dark']
    }};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &:after {
        ${({theme}) => theme.isSelected && `
            content: '';
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            border: 3.5px solid grey;
            opacity: 0.7;
            border-radius: 50%;
            z-index: 0;`
        }
    }
`;

export const FigureImg = styled.img`
    z-index: 1;
`;
