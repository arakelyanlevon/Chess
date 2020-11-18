import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

export const Row = styled(Grid)`
    margin: 10px !important;
    width: 100% !important;
`;

export const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
`;

export const Icon = styled(IconButton)`
    cursor: text !important;
    &:hover {
        background-color: transparent !important;
    }
`;
