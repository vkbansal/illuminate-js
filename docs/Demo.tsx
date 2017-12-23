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
    alignItems: 'stretch'
});

const Column = glamorous.div({
    width: '50%',
    '&:first-child': {
        borderRight: '1px solid #eee'
    },
    '& > pre': {
        margin: 0,
        height: 'calc(100vh - 56px)'
    }
});

const Selection = glamorous.div({
    borderBottom: '1px solid #eee',
    padding: '16px',
    height: '56px'
});

const TextBox = glamorous.textarea({
    width: '100%',
    border: '1px solid',
    borderColor: '#eee transparent',
    background: '#fafafa',
    padding: '16px',
    resize: 'none',
    height: 'calc(100vh - 56px)'
});

export class Demo extends React.Component<{}, DemoState> {
    private container: HTMLDivElement;

    constructor(props: any) {
        super(props);
        this.state = {
            text: snippets.markup.trim(),
            lang: 'markup'
        };
    }

    componentDidMount() {
        const c = this.container.querySelector('textarea');
        c && c.focus();
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

    containerRef = (c: HTMLDivElement) => (this.container = c);

    render() {
        let { text, lang } = this.state;

        return (
            <div ref={this.containerRef}>
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
                <Row>
                    <Column>
                        <TextBox rows={10} value={text} onChange={this.handleTextChange} />
                    </Column>
                    <Column>
                        <Illuminate lang={lang}>{text}</Illuminate>
                    </Column>
                </Row>
            </div>
        );
    }
}
