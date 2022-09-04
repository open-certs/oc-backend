const { Octokit } = require('@octokit/rest');
const CurrentlyUnavailableError = require('../errors/currentlyUnavailable.error');

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

const checkStatus202 = (response) => {
    if (response?.status === 202) {
        throw new CurrentlyUnavailableError(
            'This Operation is Currently Unavailable, Please try after a few seconds.'
        );
    }
};

const getMyCommits = async (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `author:@me repo:${owner}/${repo} sort:committer-date-desc`;
    // console.log(q);
    const response = await kit.rest.search.commits({
        q
    });
    checkStatus202(response);
    return response;
};

const getMyPullRequests = async (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `is:merged is:pr author:@me repo:${owner}/${repo} sort:created-desc`;
    // console.log(q);
    const response = await kit.rest.search.issuesAndPullRequests({
        q
    });
    checkStatus202(response);
    return response;
};

const getAllMergedPullRequests = async (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `is:merged is:pr -author:@me repo:${owner}/${repo} is:closed`;
    // console.log(q);
    const response = await kit.rest.search.issuesAndPullRequests({
        q
    });
    checkStatus202(response);
    return response;
};

const getAllClosedIssues = async (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `is:closed is:issue repo:${owner}/${repo} linked:pr`;
    const response = await kit.rest.search.issuesAndPullRequests({
        q
    });
    checkStatus202(response);
    return response;
};

const getAllContributors = async (auth, owner, repo) => {
    const kit = getKit(auth);
    const response = await kit.rest.repos.getContributorsStats({
        owner,
        repo
    });
    checkStatus202(response);
    return response;
};

module.exports = {
    getRepo,
    getMyCommits,
    getMyPullRequests,
    getAllMergedPullRequests,
    getAllClosedIssues,
    getAllContributors
};
