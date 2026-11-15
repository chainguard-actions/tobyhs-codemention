import * as core from '@actions/core';
import * as yaml from 'js-yaml';
export class ConfigurationReaderImpl {
    octokitRest;
    /**
     * @param octokitRest - GitHub REST API client
     */
    constructor(octokitRest) {
        this.octokitRest = octokitRest;
    }
    /** @override */
    async read(repo, ref) {
        core.debug(`Reading codemention.yml on ${ref}`);
        const { data } = await this.octokitRest.repos.getContent({
            owner: repo.owner,
            repo: repo.repo,
            path: '.github/codemention.yml',
            ref,
        });
        if ('content' in data) {
            const content = Buffer.from(data.content, 'base64').toString();
            return yaml.load(content);
        }
        throw new Error('No content for .github/codemention.yml');
    }
}
