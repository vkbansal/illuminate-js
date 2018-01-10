import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

import { addLanguage, Definition } from 'illuminate-js';
import * as langs from 'illuminate-js/lib/languages';

type LangMap = Record<string, Definition>;

Object.keys(langs).forEach(lang => addLanguage(lang, (langs as LangMap)[lang] as any));
addLanguage('javascript', langs.jsx);
addLanguage('typescript', langs.tsx);

import './theme.css';
import 'illuminate-js/lib/plugins/lineNumbers/style.css';
import 'illuminate-js/lib/plugins/showLanguage/style.css';

import { GettingStarted } from './components/GettingStarted';
import { Plugins } from './components/Plugins';
import { LanguageDefinition } from './components/LanguageDefinition';
import { ReactGettingStared } from './components/ReactGettingStared';
import { ReactApi } from './components/ReactApi';
import { Demo } from './components/Demo';

const Wrapper = glamorous.div({
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'stretch'
});

const Sidebar = glamorous.nav('pure-menu', {
    background: '#eee',
    width: '250px',
    padding: '16px 0'
});

const Content = glamorous.section({
    background: '#fff',
    width: 'calc(100% - 250px)',
    boxShadow: '-2px 0px 8px -2px rgba(0, 0,0, 0.2)'
});

const NavHeading = glamorous.div('pure-menu-heading', {
    fontWeight: 'bold'
});

const Nav = glamorous.ul('pure-menu-list', {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    fontSize: '0.9rem'
});

const NavItem = glamorous.li('pure-menu-item', {
    height: 'auto'
});

const Link = glamorous(NavLink)('pure-menu-link', {
    position: 'relative',
    transition: 'background 0.2s linear',
    '&:hover': {
        background: 'rgba(0, 0, 0, 0.07)'
    },
    '&.active': {
        color: '#e94949',
        '&::after': {
            opacity: 1
        }
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        display: 'block',
        width: 0,
        height: 0,
        border: '8px solid transparent',
        borderRightColor: '#fff',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 0,
        transition: 'opacity 0.2s linear'
    }
});

class App extends React.Component {
    render() {
        return (
            <Router>
                <Wrapper>
                    <Sidebar>
                        <NavHeading>Illuminate JS</NavHeading>
                        <Nav>
                            <NavItem>
                                <Link exact to="/">
                                    Getting Started
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link exact to="/api/">
                                    API
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link exact to="/plugins/">
                                    Plugins
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link exact to="/language-definition">
                                    Language Definition
                                </Link>
                            </NavItem>
                        </Nav>
                        <NavHeading>React Illuminate</NavHeading>
                        <Nav>
                            <NavItem>
                                <Link exact to="/react/">
                                    Getting Started
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link exact to="/react-api/">
                                    API
                                </Link>
                            </NavItem>
                        </Nav>
                        <NavHeading>Demo</NavHeading>
                        <Nav>
                            <NavItem>
                                <Link to="/demo">Demo</Link>
                            </NavItem>
                        </Nav>
                    </Sidebar>
                    <Content>
                        <Route path="/" exact component={GettingStarted} />
                        <Route path="/api" exact component={GettingStarted} />
                        <Route path="/plugins" exact component={Plugins} />
                        <Route path="/language-definition" exact component={LanguageDefinition} />
                        <Route path="/react" exact component={ReactGettingStared} />
                        <Route path="/react-api" exact component={ReactApi} />
                        <Route path="/demo/:lang?" component={Demo} />
                    </Content>
                </Wrapper>
            </Router>
        );
    }
}

render(<App />, document.getElementById('app'));
