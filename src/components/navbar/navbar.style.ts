import styled from 'styled-components'

export const NavbarComponent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: white;
    box-shadow: 0 0 13px -3px #333;
    z-index: 99;
`
export const FlexWrap = styled.div`
    width: 100%;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const LogoWrap = styled.div`
    display: flex;
    align-items: center;
`
export const IconStyle = {
    linkedin: {
        color: '#1677ff',
        fontSize: '22px',
        marginRight: 10,
    },
    github: {
        fontSize: 20,
    },
}
