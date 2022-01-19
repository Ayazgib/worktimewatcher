// @ts-ignore
import {createGlobalStyle} from "styled-components"
export const darkTheme = {
    body: "#012851",
    textColor: "#E8E8E8",
    headingColor: "#E8E8E8",
    btnBackground: '#0379B9',
    btnBorder: '1px solid white',
    selectedBg: '#507f99',
    inputBorder: '#fff',
    headerBg: '#0369A1',
    activeLink: '#000'
}

export const lightTheme = {
    body: "#fff",
    textColor: "#000",
    headingColor: "#000",
    btnBackground: '',
    activeLink: '#1976D2'
}


export const GlobalStyles = createGlobalStyle`
  body {
    background: ${(props: any) => props.theme.body};
    color: ${(props: any) => props.theme.textColor};
    transition: .3s ease;
  }
  h2{
    color: ${(props: any) => props.theme.headingColor};
  }
  
  p,a,span,h1,h2,h3,h4,h5,h6, button, .MuiToggleButton-root, .Mui-selected, legend, label, b, #demo-multiple-name {
    color: ${(props: any) => props.theme.headingColor} !important;
  }
  .Mui-selected {
    background-color: ${(props: any) => props.theme.selectedBg} !important;
  }
  .header {
    background-color: ${(props: any) => props.theme.headerBg} !important;;
  }
  .headerLink.active {
    color: ${(props: any) => props.theme.activeLink} !important;
  }
  button {
    background-color: ${(props: any) => props.theme.btnBackground}!important;
    border: ${(props: any) => props.theme.btnBorder}!important;
  }
  
`