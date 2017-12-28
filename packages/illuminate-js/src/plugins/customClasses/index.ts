import { Plugin } from '../../illuminate';
import { TokenEnv } from '../../Token';

export interface CustomClassesOptions {
    prefix?: string;
    map?: Record<string, string>;
}

export function customClasses(options?: CustomClassesOptions): Plugin {
    return add => {
        add('wrap', env => {
            if (!options) return;

            (env as TokenEnv).classes = (env as TokenEnv).classes.map(c => {
                return (
                    (options.prefix || '') +
                    (options.map && Object.prototype.hasOwnProperty.call(options.map, c)
                        ? options.map[c]
                        : c)
                );
            });
        });
    };
}
