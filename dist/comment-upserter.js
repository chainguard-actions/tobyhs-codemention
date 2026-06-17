import * as core from '@actions/core';
import { FOOTER } from './comment-renderer.js';
export class CommentUpserterImpl {
    octokitRest;
    /**
     * @param octokitRest - GitHub REST API client
     */
    constructor(octokitRest) {
        this.octokitRest = octokitRest;
    }
    /** @override */
    async upsert(repo, pullNumber, rules, comment) {
        const issuesApi = this.octokitRest.issues;
        const listResponse = await issuesApi.listComments({
            owner: repo.owner,
            repo: repo.repo,
            issue_number: pullNumber,
        });
        const existingComment = listResponse.data.find(c => c.body !== undefined &&
            // keep backwards compatibility with existing comments that have the comment first
            (c.body.startsWith(FOOTER) || c.body.endsWith(FOOTER)));
        if (existingComment === undefined) {
            if (rules.length > 0) {
                core.info('Creating a pull request comment');
                await issuesApi.createComment({
                    owner: repo.owner,
                    repo: repo.repo,
                    issue_number: pullNumber,
                    body: comment,
                });
            }
            else {
                core.info('Not creating a pull request comment. No rules matched.');
            }
        }
        else if (existingComment.body !== comment) {
            core.info('Updating pull request comment');
            await issuesApi.updateComment({
                owner: repo.owner,
                repo: repo.repo,
                comment_id: existingComment.id,
                body: comment,
            });
        }
        else {
            core.info('Not updating pull request comment. Comment body matched.');
        }
    }
}
