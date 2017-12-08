import * as React from 'react';
import glamorous from 'glamorous';
import { Illuminate } from 'react-illuminate';

import * as snippets from './snippets';

export interface DemoState {
    text: string;
    lang: string;
}

const Row = glamorous.div({
    display: 'flex',
    alignItems: 'stretch',
    height: '100%'
});

const Column = glamorous.div({
    width: '50%',
    padding: '0 16px',
    '&:first-child': {
        borderRight: '1px solid #eee'
    }
});

const Selection = glamorous.div({
    borderBottom: '1px solid #eee',
    margin: '0 -16px',
    padding: '16px'
});

const TextBox = glamorous.textarea({
    width: '100%',
    resize: 'vertical'
});

export class Demo extends React.Component<{}, DemoState> {
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
            <Row>
                <Column>
                    <Selection>
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
                    </Selection>
                    <div>
                        <h2>Your code:</h2>
                        <TextBox rows={10} value={text} onChange={this.handleTextChange} />
                    </div>
                </Column>
                <Column>
                    <h2>Output:</h2>
                    <Illuminate lang={lang}>{text}</Illuminate>
                </Column>
            </Row>
        );
    }
}
