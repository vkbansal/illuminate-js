import jsx from '../../src/languages/jsx';
import { tokenize } from '../../src/illuminate';
import tokenToJson from '../helpers/tokenToJson';

const testCode = `class MyComponent extends Component
    render() {
        const {tabs, ...otherProps} = this.props;
        const {currentTab} = this.state;

        return (
            <TabBar
                {...otherProps}
                currentTab={currentTab}
                onTabClick={this.onTabClick}
                tabs={tabs}
            />
        )
    }
}`;

describe('jsx lang test', () => {
    test('native values', () => {
        expect(tokenToJson(tokenize(testCode, jsx))).toMatchSnapshot();
    });
});
