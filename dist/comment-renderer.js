import * as core from '@actions/core';
import Handlebars from 'handlebars';
import markdownEscape from 'markdown-escape';
export const FOOTER = '<!-- codemention header -->';
const DEFAULT_COMMENT_PREAMBLE = '[CodeMention](https://github.com/tobyhs/codemention):';
const HANDLEBARS_HELPERS = {
    markdownEscape(text) {
        return markdownEscape(text, ['slashes']);
    },
};
const DEFAULT_TEMPLATE = `{{preamble}}
| File Patterns | Mentions |
| - | - |
{{#each matchedRules}}
| {{#each patterns}}{{markdownEscape this}}{{#unless @last}}<br>{{/unless}}{{/each}} | {{#each mentions}}@{{this}}{{#unless @last}}, {{/unless}}{{/each}} |
{{/each}}

{{#if epilogue}}
{{epilogue}}
{{/if}}
`;
const PREAMBLE_EPILOGUE_DEPRECATION_MSG = 'The preamble and epilogue options in commentConfiguration are deprecated. Use template instead.';
export class CommentRendererImpl {
    /** @override */
    render(rules, commentConfiguration) {
        let warningMessage = '';
        if (commentConfiguration?.preamble || commentConfiguration?.epilogue) {
            core.warning(PREAMBLE_EPILOGUE_DEPRECATION_MSG);
            warningMessage = `\nWarning: ${PREAMBLE_EPILOGUE_DEPRECATION_MSG}\n`;
        }
        const template = commentConfiguration?.template ?? DEFAULT_TEMPLATE;
        const context = {
            matchedRules: rules,
            mentions: this.createMentionsList(rules),
            preamble: commentConfiguration?.preamble ?? DEFAULT_COMMENT_PREAMBLE,
            epilogue: commentConfiguration?.epilogue,
        };
        const comment = Handlebars.compile(template, { noEscape: true })(context, {
            helpers: HANDLEBARS_HELPERS,
        });
        return `${comment}${warningMessage}${FOOTER}`;
    }
    createMentionsList(rules) {
        const namesToFiles = new Map();
        for (const rule of rules) {
            for (const name of rule.mentions) {
                let fileSet = namesToFiles.get(name);
                if (!fileSet) {
                    fileSet = new Set();
                    namesToFiles.set(name, fileSet);
                }
                for (const file of rule.matchedFiles) {
                    fileSet.add(file);
                }
            }
        }
        const mentions = [];
        for (const [name, fileSet] of namesToFiles) {
            mentions.push({ name, matchedFiles: [...fileSet].sort() });
        }
        return mentions.sort((a, b) => a.name.localeCompare(b.name));
    }
}
