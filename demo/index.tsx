import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

import { addLanguage } from 'illuminate-js';
import { bash } from 'illuminate-js/lib/languages/bash';
import { css } from 'illuminate-js/lib/languages/css';
import { markup } from 'illuminate-js/lib/languages/markup';
import { jsx } from 'illuminate-js/lib/languages/jsx';

addLanguage('bash', bash);
addLanguage('css', css);
addLanguage('markup', markup);
addLanguage('javascript', jsx);
addLanguage('js', jsx);
addLanguage('jsx', jsx);

import './theme';

import { Main } from './Main';
import { ReactApi } from './ReactApi';
import { Demo } from './Demo';

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

const Nav = glamorous.ul('pure-menu-list', {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
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
                        <Nav>
                            <NavItem>
                                <Link exact to="/">
                                    Illuminate
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link exact to="/react">
                                    React-Illuminate
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link exact to="/interactive-demo">
                                    Interactive Demo
                                </Link>
                            </NavItem>
                        </Nav>
                    </Sidebar>
                    <Content>
                        <Route path="/" exact component={Main} />
                        <Route path="/react" exact component={ReactApi} />
                        <Route path="/interactive-demo" exact component={Demo} />
                    </Content>
                </Wrapper>
            </Router>
        );
    }
}

render(<App />, document.getElementById('app'));
