import * as React from 'react';
import { render } from 'react-dom';
import { css } from 'glamor';
import * as snippets from './snippets';

import { Illuminate } from 'react-illuminate';
import { addLanguage } from 'illuminate-js';
import { bash } from 'illuminate-js/lib/languages/bash';
import { css as cssLang } from 'illuminate-js/lib/languages/css';
import { markup } from 'illuminate-js/lib/languages/markup';
import { javascript } from 'illuminate-js/lib/languages/javascript';
import { jsx } from 'illuminate-js/lib/languages/jsx';

import './theme';

interface AppState {
    text: string;
    lang: string;
}

addLanguage('bash', bash);
addLanguage('css', cssLang);
addLanguage('markup', markup);
addLanguage('javascript', javascript);
addLanguage('jsx', jsx);

const row = css({
    display: 'flex',
    alignItems: 'stretch',
    height: '100%'
}).toString();

const col = css({
    width: '50%',
    padding: '0 16px',
    '&:first-child': {
        borderRight: '1px solid #eee'
    }
}).toString();

const selection = css({
    borderBottom: '1px solid #eee',
    margin: '0 -16px',
    padding: '16px'
}).toString();

const textBox = css({
    width: '100%',
    resize: 'vertical'
}).toString();

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            text: snippets.markup.trim(),
            lang: 'markup'
        };
    }

    handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let val = e.target.value;

        this.setState({
            text: (snippets as Record<string, string>)[val].trim(),
            lang: val
        });
    };

    handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.target.value;

        this.setState({ text });
    };

    render() {
        let { text, lang } = this.state;

        return (
            <div className={row}>
                <div className={col}>
                    <div className={selection}>
                        <label>Select language:&nbsp;</label>
                        <select
                            className="form-control form-control-sm"
                            value={lang}
                            onChange={this.handleLangChange}>
                            {Object.keys(snippets).map((l, i) => (
                                <option key={i} value={l}>
                                    {l}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h2>Your code:</h2>
                        <textarea
                            className={textBox}
                            rows={10}
                            value={text}
                            onChange={this.handleTextChange}
                        />
                    </div>
                </div>
                <div className={col}>
                    <h2>Output:</h2>
                    <Illuminate lang={lang}>{text}</Illuminate>
                </div>
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));
