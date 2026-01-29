import { MarkedExtension } from 'marked';

export const customIdExtension: MarkedExtension = {
    extensions: [
        {
            name: 'customId',
            level: 'inline',

            // Match [ID<number>]
            start(src: string) {
                const match = src.match(/\[ID\d+\]/);
                return match ? match.index : undefined;
            },

            tokenizer(src: string) {
                const rule = /^\[ID(\d+)\]/;
                const match = rule.exec(src);
                if (!match) return;

                return {
                    type: 'customId',
                    raw: match[0],
                    id: match[1],
                };
            },

            renderer(token: any) {
                return `<custom-id id="${token.id}"></custom-id>`;
            },
        },
    ],
};
