import React from 'react'
import styled from 'styled-components'


const Header = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '40px'}}>
            <Wrapper>
                <Logo>積立シミュレーター</Logo>
            </Wrapper>
        </div>

    )
}

export default Header


const Wrapper = styled.div`
    width: 90vw;
    height: 100px;
    
    box-shadow: 9px 9px 16px rgb(163 177 198 / 60%), -9px -9px 16px rgb(255 255 255 / 50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 30px;
    border-radius: 30px;
    position: relative;
    background: transparent;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
`

const Logo = styled.div`
    margin-right: auto;
    font-family: "Roboto", sans-serif;
    font-size: 1.5rem;
    color: dimgray;
    font-weight: 900;
    text-shadow: 2px 2px 4px rgb(0 0 0 / 30%), -2px -2px 4px white;
`