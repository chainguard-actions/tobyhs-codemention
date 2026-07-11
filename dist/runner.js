import * as core from '@actions/core';
import micromatch from 'micromatch';
/**
 * @see {@link run}
 */
export default class Runner {
    configurationReader;
    filesChangedReader;
    commentRenderer;
    commentUpserter;
    /**
     * @param configurationReader - object to read a repo's codemention.yml file
     * @param filesChangedReader - object to retrieve files changed in a pull request
     * @param commentRenderer - object to create the pull request comment body
     * @param commentUpserter - object to upsert pull request comments
     */
    constructor(configurationReader, filesChangedReader, commentRenderer, commentUpserter) {
        this.configurationReader = configurationReader;
        this.filesChangedReader = filesChangedReader;
        this.commentRenderer = commentRenderer;
        this.commentUpserter = commentUpserter;
    }
    /**
     * Runs the main logic of the GitHub action
     *
     * @param context - context of the GitHub action
     */
    async run(context) {
        const { repo } = context;
        const event = context.payload;
        const pullRequest = event.pull_request;
        if (pullRequest.draft) {
            core.debug('Skipping draft pull request');
            return;
        }
        const [configuration, filesChanged] = await Promise.all([
            this.configurationReader.read(repo, pullRequest.base.sha),
            this.filesChangedReader.read(repo, pullRequest.number),
        ]);
        const matchedRules = configuration.rules
            .map(rule => ({
            ...rule,
            // filter out PR author from mentions so they don't get double-notified
            mentions: rule.mentions.filter(mention => mention !== pullRequest.user.login),
            matchedFiles: micromatch(filesChanged, rule.patterns, { dot: true }),
        }))
            .filter(rule => rule.matchedFiles.length > 0 && rule.mentions.length > 0);
        const comment = this.commentRenderer.render(matchedRules, configuration.commentConfiguration);
        await this.commentUpserter.upsert(repo, pullRequest.number, matchedRules, comment);
    }
}
