const { Octokit } = require('@octokit/rest');

const getKit = (auth) => {
    return new Octokit({
        auth
    });
};

const getRepo = (auth, owner, repo) => {
    const kit = getKit(auth);
    return kit.rest.repos.get({
        owner,
        repo
    });
};

const getMyCommits = (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `author:@me repo:${owner}/${repo} sort:committer-date-desc`;
    // console.log(q);
    return kit.rest.search.commits({
        q
    });
};

const getMyPullRequests = (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `is:merged is:pr author:@me repo:${owner}/${repo} sort:created-desc`;
    // console.log(q);
    return kit.rest.search.issuesAndPullRequests({
        q
    });
};

const getAllMergedPullRequests = (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `is:merged is:pr -author:@me repo:${owner}/${repo} is:closed`;
    // console.log(q);
    return kit.rest.search.issuesAndPullRequests({
        q
    });
};

const getAllClosedIssues = (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `is:closed is:issue repo:${owner}/${repo} linked:pr`;
    return kit.rest.search.issuesAndPullRequests({
        q
    });
};

const getAllContributors = (auth, owner, repo) => {
    const kit = getKit(auth);
    return kit.rest.repos.getContributorsStats({
        owner,
        repo
    });
};

module.exports = {
    getRepo,
    getMyCommits,
    getMyPullRequests,
    getAllMergedPullRequests,
    getAllClosedIssues,
    getAllContributors
};
