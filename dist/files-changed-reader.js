import * as core from '@actions/core';
export class FilesChangedReaderImpl {
    octokit;
    /**
     * @param octokit - GitHub API client
     */
    constructor(octokit) {
        this.octokit = octokit;
    }
    /** @override */
    async read(repo, pullNumber) {
        const filesChanged = await this.octokit.paginate(this.octokit.rest.pulls.listFiles, {
            owner: repo.owner,
            repo: repo.repo,
            pull_number: pullNumber,
            per_page: 100,
        }, response => response.data.map(file => file.filename));
        core.debug(`Files changed: ${filesChanged}`);
        return filesChanged;
    }
}
