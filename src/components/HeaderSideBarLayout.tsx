import React, {useState} from 'react';
import styled from "styled-components";
import {logo} from '../accets/images/logo';
import {dropdownIndicator} from "../accets/icons/dropdownIndicator";
import useOnclickOutside from "react-cool-onclickoutside";
import {OutOfSitePathIcon} from "../accets/icons/outOfSitePathIcon";

const sideBarProductsObj = [
  {
    name: "GitHub.com"
  },
  {
    name: "GitHub Enterprise"
  },
  {
    name: "Billing and payments"
  },
  {
    name: "Organizations"
  },
  {
    name: "Code security"
  },
  {
    name: "GitHub Actions"
  },
  {
    name: "GitHub Packages"
  },
  {
    name: "Developers"
  },
  {
    name: "REST API"
  },
  {
    name: "GraphQL API"
  },
  {
    name: "GitHub Insights"
  },
  {
    name: "Issues and projects"
  },
  {
    name: "GitHub Discussions"
  },
  {
    name: "GitHub Codespaces"
  },
  {
    name: "GitHub Sponsors"
  },
  {
    name: "Building communities"
  },
  {
    name: "GitHub Pages"
  },
  {
    name: "Education"
  },
  {
    name: "GitHub Desktop"
  },
  {
    name: "GitHub CLI",
    external: true
  },
  {
    name: "Atom",
    external: true
  },
  {
    name: "Electron",
    external: true
  },
  {
    name: "CodeQL",
    external: true
  }
]

const versionObj = [
  'Enterprise Server 3.1',
  'Enterprise Server 3.2',
  'Enterprise Server 3.3',
  'Enterprise Server 2.22'
]

const languageObj = [
  'English',
  '简体中文 (Simplified Chinese)',
  '日本語 (Japanese)',
  'Español (Spanish)',
  'Português do Brasil (Portuguese)'
]

const Logo = ({media}: { media?: boolean }) => (
  <LogoStyles media={media}>
    {logo}
    <span>
      GitHub Docs
    </span>
  </LogoStyles>
)

const CustomSelect = (
  {
    burger,
    defaultValue,
    language,
    obj
  }: any) => {
  const [title, setTitle] = useState(defaultValue)
  const [optionsMode, setOptionsMode] = useState(false)
  const setModeWorker = () => {
      setOptionsMode(!optionsMode)
  }
  const disabled = burger
  const ref = useOnclickOutside(() => {
    setOptionsMode(false)
  }, {disabled});

  const options = obj.map((option: any) => <span className={option === title ? 'active' : ''} key={option}
                                                      onClick={() => setTitle(option)}>{option}</span>)
  return (
    <MainBlock onMode={optionsMode}
               onClick={setModeWorker}
               ref={ref}>
      <Title burger={burger}>
        {title} &nbsp;
        {dropdownIndicator}
      </Title>
      <Options  onMode={optionsMode}
                burger={burger}
                language={language}>
        {options}
      </Options>
    </MainBlock>
  )
}

export const Header = () => {
  const [language, setLanguage] = useState(languageObj[0])
  const [version, setVersion] = useState('Version')
  const [versionMode, setVersionMode] = useState(false)
  const [languageMode, setLanguageMode] = useState(false)
  const [burgerMenu, setBurgerMenu] = useState(false)
  const [burgerMenuOptions, setBurgerMenuOptions] = useState(false)

  const ref = useOnclickOutside(() => {
    menusOff()
  });

  const menusOff = () => {
    setVersionMode(false)
    setLanguageMode(false)
  }

  const versionOptions = versionObj.map(vers => <span className={vers === version ? 'active' : ''} key={vers}
                                                      onClick={() => setVersion(vers)}>{vers}</span>)
  const languageOptions = languageObj.map(lang => <span className={lang === language ? 'active' : ''} key={lang}
                                                        onClick={() => setLanguage(lang)}>{lang}</span>)

  const sidebarOptions = sideBarProductsObj.map(product => <SideBarOptionBlock>
    <SideBarOption key={product.name} title={product.name}>
      {product.name}
    </SideBarOption>
    {product.external &&
    <OutOfSitePathIcon/>
    }
  </SideBarOptionBlock>)

  const versionModeWorker = (e: any) => {
    e.stopPropagation()
    if (languageMode) {
      setLanguageMode(false)
    } else {
      setVersionMode(!versionMode)
    }
  }

  const languageModeWorker = (e: any) => {
    e.stopPropagation()
    if (versionMode) {
      setVersionMode(false)
    } else {
      setLanguageMode(!languageMode)
    }
  }
  return (
    <WrapHeaderSideBarLayout>
      <HeaderStyles onClick={menusOff} burgerMenu={burgerMenu}>
        <BurgerHead>
          <Logo media/>
          <BurgerMenuButtons>
            {burgerMenu
              ? <img src="https://docs.github.com/assets/images/octicons/x.svg"
                     alt="burger"
                     onClick={() => setBurgerMenu(false)}/>
              : <img src="https://docs.github.com/assets/images/octicons/hamburger.svg"
                     alt="burger"
                     onClick={() => setBurgerMenu(true)}/>
            }
          </BurgerMenuButtons>
        </BurgerHead>
        {burgerMenu
          ? <BurgerMenu>
            <MenuTitle>
              Explore by product
            </MenuTitle>
            <Indicator onClick={() => setBurgerMenuOptions(!burgerMenuOptions)}
                       burgerMenuOptions={burgerMenuOptions}>
              {dropdownIndicator}
            </Indicator>
            {burgerMenuOptions
              ? <MenuOptions>
                dfsf
              </MenuOptions>
              : ''
            }
            <HorizonLine/>
            <CustomSelect burger={true} defaultValue={'Version'} obj={versionObj}/>
            {/*{versionBlock(versionMode, version, versionOptions, versionModeWorker, ref, true)}*/}
            <HorizonLine/>
            <CustomSelect burger={true} defaultValue={languageObj[0]} obj={languageObj}/>
            {/*{languageBlock(languageMode, ref, languageModeWorker, language, languageOptions, true)}*/}
          </BurgerMenu>
          : ''
        }
        <SelectItems>
          <CustomSelect burger={false} defaultValue={'Version'} obj={versionObj}/>
          <CustomSelect language={true} burger={false} defaultValue={languageObj[0]} obj={languageObj}/>
          {/*{versionBlock(versionMode, version, versionOptions, versionModeWorker, ref, false)}*/}
          {/*{languageBlock(languageMode, ref, languageModeWorker, language, languageOptions, false)}*/}
        </SelectItems>
      </HeaderStyles>
      <Sidebar>
        <Logo/>
        <Products>
          {sidebarOptions}
        </Products>
      </Sidebar>
      <Children burgerMenu={burgerMenu}>
        something
      </Children>
    </WrapHeaderSideBarLayout>
  );
}

const HorizonLine = styled.hr`
  margin: 15px 0 15px 0;
  width: 100%;
  opacity: .2;
`

const WrapHeaderSideBarLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas:
  "n h"
  "n c";
  grid-template-rows: 65px;
  grid-template-columns: 260px;
  @media screen and (max-width: 1012px) {
    display: flex;
    flex-direction: column;
  }
`

const HeaderStyles = styled.header<{ burgerMenu: boolean }>`
  grid-area: h;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 40px;
  border-bottom: 1px solid #e1e4e8;
  @media screen and (max-width: 1012px) {
    justify-content: space-between;
  }
  @media screen and (max-width: 668px) {
    padding: 16px 16px 0 16px;
    flex-direction: column;
    align-items: flex-start;
    position: ${props => props.burgerMenu && 'absolute'};
    width: ${props => props.burgerMenu && '100%'};
    background-color: ${props => props.burgerMenu ? '#FAFBFC' : '#fff'};
    height: ${props => props.burgerMenu ? '' : '65px;'};
    border-bottom: ${props => props.burgerMenu ? '0px' : `1px solid #e1e4e8`};
    box-shadow: ${props => props.burgerMenu && '0 1px 15px rgb(0 0 0 / 15%)'};
  }
  @media screen and  (min-width: 668px) {
    height: 65px;
  }
`

const LogoStyles = styled.div<{ media?: boolean }>`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  cursor: pointer;
  ${props => props.media
          ? ''
          : `position: fixed;
      background-color: #f6f8fa;
      left: 0;
      top: 0;
      padding-left: 24px;
      width: 243px;
      height: 80px;`
  }

  z-index: 1;

  span {
    font-size: 17px;
    font-weight: 500;
  }

  ${props => props.media
          ? `@media screen and (min-width: 1012px) {
      display: none;
      };`
          : ''
  }
`

const BurgerMenuButtons = styled.nav`
  cursor: pointer;
  @media screen and (min-width: 668px) {
    display: none;
  }
`

const MenuTitle = styled.div`
  margin-top: 23px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace !important;
  opacity: .8;

`

const Indicator = styled.div<{ burgerMenuOptions: boolean }>`
  color: #2188ff;
  cursor: pointer;
  width: 100%;

  svg {
    transform: ${props => props.burgerMenuOptions && `rotate(180deg)`};
  }

`

const MenuOptions = styled.div`

`

const BurgerHead = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 668px) {
    width: 100%;
  }
`

const BurgerMenu = styled.div`
  width: 100%;
  margin-bottom: 30px;
  @media screen and (min-width: 668px) {
    display: none;
  }
`

const SelectItems = styled.div`
  display: flex;
  grid-gap: 20px;
  @media screen and (max-width: 668px) {
    display: none;
  }
`

const MainBlock = styled.div<{ onMode: boolean }>`
  position: relative;

  svg {
    ${props => props.onMode && 'transform: rotate(180deg);'}
  }
`

const LanguageStyles = styled.div<{ languageMode: boolean }>`
  position: relative;

  svg {
    ${props => props.languageMode && 'transform: rotate(180deg);'}
  }
`

const Title = styled.div<{ burger: boolean }>`
  font-size: ${props => !props.burger && '16px'};
  cursor: pointer;

  ${props => props.burger &&
          `display: flex;
  justify-content: space-between;
  align-items: center;`}
`



const Options = styled.div<{ language?: boolean, onMode: boolean, burger: boolean }>`
  cursor: pointer;
  display: ${props => props.onMode ? 'flex' : 'none'};
  flex-direction: column;
  min-width: ${props => props.language ? '260px' : '200px'};
  border-radius: 3px;
  margin-top: ${props => props.burger ? '20px' : '10px'};
  grid-gap: 20px;

  ${props => !props.burger &&
          `position: absolute;
    right: ${props.language ? '3%': '-20%;'};
    padding: 24px;
    background: white;
    box-shadow: 0 1px 15px rgb(0 0 0 / 15%);`
  }
  span:hover {
    color: #0366d6;
  }

  .active {
    color: #0366d6;
  }
`

const LanguageOptions = styled.div<{ languageMode: boolean, burger: boolean }>`
  cursor: pointer;
  display: ${props => props.languageMode ? 'flex' : 'none'};
  flex-direction: column;
  min-width: 260px;
  border-radius: 3px;
  grid-gap: 20px;
  margin-top: ${props => props.burger ? '20px' : '10px'};

  ${props => !props.burger &&
          `position: absolute;
    right: 3%;
    padding: 24px;
    background: white;
    box-shadow: 0 1px 15px rgb(0 0 0 / 15%);`
  }
  span:hover {
    color: #0366d6;
  }

  .active {
    color: #0366d6;
  }
`

const Sidebar = styled.div`
  grid-area: n;
  width: 260px;
  top: 0;
  position: relative;
  padding: 24px 24px 32px 24px;
  word-break: break-all;
  overflow-y: auto;
  flex-shrink: 0;
  background-color: #f6f8fa;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1012px) {
    display: none;
  }
`

const Products = styled.nav`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  margin-top: 15vh;
`

const SideBarOptionBlock = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  opacity: .8;
  cursor: pointer;
`

const SideBarOption = styled.span`
  font-size: 16px;
`

const Children = styled.div<{ burgerMenu: boolean }>`

  @media screen and (max-width: 668px) {
    margin-top: ${props => props.burgerMenu && '65px'};
  }
`
