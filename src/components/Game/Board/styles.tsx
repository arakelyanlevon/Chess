import styled from 'styled-components';
import styles from '../../../resources/styles';

export const Main = styled.div`
    width: ${styles.cell.width * 9}px;
    height: ${styles.cell.height * 9}px;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
`;

export const Row = styled.div`
    width: 100%;
    display: flex;
`;

export const ID = styled.div`
    width: ${({theme}) => {
        return styles.cell.width / (theme.isWidthLonger ? 1 : 2)
    }}px;
    height: ${({theme}) => {
        return styles.cell.height / (theme.isHeightLonger ? 1 : 2)
    }}px;
    background-color: #2b2b2b;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`;