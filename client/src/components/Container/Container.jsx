import styled from "styled-components";

const StyledContainer = styled.div`
    width: 100%;
    max-width: 1296px;
    margin: 90px 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
`

export function Container({children}){
    return (
        <StyledContainer>{children}</StyledContainer>
    );
};