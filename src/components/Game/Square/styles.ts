import styled from 'styled-components';
import styles from '../../../resources/styles';

export const Index = styled.div`
    background-color: #2b2b2b;
    width: ${({theme}) => {
        return styles.cell.width / (theme.isWidthLonger ? 1 : 2)
    }}px;
    height: ${({theme}) => {
        return styles.cell.height / (theme.isWidthLonger ? 2 : 1)
    }}px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #cecece;
`;

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
`;

export const Container = styled.div`
    display: ${({theme}) => {
        return theme.isFlex ? 'flex' : '';
    }}
`;

export const FigureImg = styled.img`
    z-index: 0;
`;
