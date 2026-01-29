import { MarkedExtension } from 'marked';


// here is the genius : 
// we define a custom Marked extension that declares a new tag 'customId'
// it is set in an inline level so that it can be embedded inside block elements (lists, tables, & such)
// we 
export const customIdExtension: MarkedExtension = {
    extensions: [
        {
            name: 'customId',
            level: 'inline',

            //start: defines the beginning of a match [ID<number>] 
            // this method optimizes the parser
            start(src: string) {
                const match = src.match(/\[ID\d+\]/);
                return match ? match.index : undefined;
            },
            // tokenizer is the concept that convert source string into an object typing the element to render, and provides data that renderer can use 
            tokenizer(src: string) {
                const rule = /^\[ID(\d+)\]/;
                const match = rule.exec(src);
                // if no match, returning undefined filters out element (in case of no match, even if our regex should not let those cases happen)
                if (!match) return;

                return {
                    type: 'customId',
                    raw: match[0],
                    id: match[1],
                };
            },
            // renderer converts tokens produced by tokenizer into string representing the tag that we will want Angular to replace by a component 
            renderer(token: any) {
                return `<custom-id id="${token.id}"></custom-id>`;
            },
        },
    ],
};
