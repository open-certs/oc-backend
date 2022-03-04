const { Octokit } = require('@octokit/rest');

const getKit = (auth) => {
    return new Octokit({
        auth
    });
};

const getGithubRepo = (auth, owner, repo) => {
    const kit = getKit(auth);
    return kit.rest.repos.get({
        owner,
        repo
    });
};

const getCommits = (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `author:@me repo:${owner}/${repo}`;
    // console.log(q);
    return kit.rest.search.commits({
        q
    });
};

const getPullRequests = (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `is:merged is:pr author:@me repo:${owner}/${repo}`;
    // console.log(q);
    return kit.rest.search.issuesAndPullRequests({
        q
    });
};

module.exports = {
    getGithubRepo,
    getCommits,
    getPullRequests,
    getLastCommits
};
