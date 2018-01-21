import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import { addLanguage, Definition } from 'illuminate-js';
import * as langs from 'illuminate-js/lib/languages';

type LangMap = Record<string, Definition>;

Object.keys(langs).forEach((lang) => addLanguage(lang, (langs as LangMap)[lang] as any));
addLanguage('javascript', langs.jsx);
addLanguage('typescript', langs.tsx);

import './theme.css';
import 'illuminate-js/lib/plugins/lineNumbers/style.css';
import 'illuminate-js/lib/plugins/showLanguage/style.css';

import { Wrapper, Sidebar, NavHeading, Nav, NavItem, Link, Content } from './components/Common';
import { GettingStarted } from './components/GettingStarted';
import { Api } from './components/Api';
import { Plugins } from './components/Plugins';
import { LanguageDefinition } from './components/LanguageDefinition';
import { ReactGettingStared } from './components/ReactGettingStared';
import { ReactApi } from './components/ReactApi';
import { Demo } from './components/Demo';

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
                        <Route path="/api" exact component={Api} />
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
