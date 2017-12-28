import * as React from 'react';
import glamorous from 'glamorous';
import { Illuminate } from 'react-illuminate';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import * as snippets from './snippets';

type Snippets = Record<string, string>;

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

const Hint = glamorous.span({
    color: '#ccc',
    marginLeft: '8px'
});

interface RouteParams {
    lang?: string;
}

type DemoProps = RouteComponentProps<RouteParams>;

export interface DemoState {
    text: string;
    lineNumbers: boolean;
    showLanguage: boolean;
}

export class Demo extends React.Component<DemoProps, DemoState> {
    private container: HTMLDivElement;

    constructor(props: DemoProps) {
        super(props);
        let { match: { params: { lang } } } = props;
        this.state = {
            text: (lang && Object.prototype.hasOwnProperty.call(snippets as Snippets, lang)
                ? (snippets as Snippets)[lang]
                : ''
            ).trim(),
            lineNumbers: true,
            showLanguage: true
        };
    }

    componentDidMount() {
        const c = this.container && this.container.querySelector('textarea');
        c && c.focus();
    }

    componentWillReceiveProps(nextProps: DemoProps) {
        let { match: { params: { lang } } } = this.props;
        let { match: { params: { lang: nextLang } } } = nextProps;

        if (
            nextLang &&
            lang !== nextLang &&
            Object.prototype.hasOwnProperty.call(snippets as Snippets, nextLang)
        ) {
            this.setState({
                text: (snippets as Snippets)[nextLang].trim()
            });
        }
    }

    handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let val = e.target.value;
        this.props.history.push(this.props.match.path.replace(':lang?', val));
    };

    handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.target.value;

        this.setState({ text });
    };

    containerRef = (c: HTMLDivElement) => (this.container = c);

    render() {
        let { match } = this.props;
        let { params: { lang }, path } = match;

        if (!lang || !(lang in snippets)) {
            return <Redirect to={path.replace(':lang?', 'markup')} />;
        }

        let { text, ...rest } = this.state;

        return (
            <div className="demo" ref={this.containerRef}>
                <Selection>
                    <label>Select language:&nbsp;</label>
                    <select
                        className="form-control form-control-sm"
                        value={lang}
                        onChange={this.handleLangChange}>
                        {Object.keys(snippets)
                            .sort()
                            .map((l, i) => (
                                <option key={i} value={l}>
                                    {l}
                                </option>
                            ))}
                    </select>
                    <Hint>(This demo uses react-illuminate)</Hint>
                </Selection>
                <Row>
                    <Column>
                        <TextBox rows={10} value={text} onChange={this.handleTextChange} />
                    </Column>
                    <Column>
                        <Illuminate {...rest} lang={lang}>
                            {text}
                        </Illuminate>
                    </Column>
                </Row>
            </div>
        );
    }
}
