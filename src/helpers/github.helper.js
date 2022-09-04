const { Octokit } = require('@octokit/rest');
const GithubAPIError = require('../errors/githubAPI.error');
const GithubAPITimeoutError = require('../errors/githubAPITimeout.error');

const getKit = (auth) => {
    return new Octokit({
        auth
    });
};

const formatGithubError = (error) => {
    throw new GithubAPIError(error.response.data.message, error.status);
};

const checkStatus202 = (response) => {
    if (response?.status === 202) {
        throw new GithubAPITimeoutError(
            'This Operation is Currently Unavailable, Please try after a few seconds.'
        );
    }
    return response;
};

const getRepo = (auth, owner, repo) => {
    const kit = getKit(auth);
    return kit.rest.repos
        .get({
            owner,
            repo
        })
        .catch(formatGithubError)
        .then(checkStatus202);
};

const getMyCommits = (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `author:@me repo:${owner}/${repo} sort:committer-date-desc`;
    // console.log(q);
    return kit.rest.search
        .commits({
            q
        })
        .catch(formatGithubError)
        .then(checkStatus202);
};

const getMyPullRequests = (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `is:merged is:pr author:@me repo:${owner}/${repo} sort:created-desc`;
    // console.log(q);
    return kit.rest.search
        .issuesAndPullRequests({
            q
        })
        .catch(formatGithubError)
        .then(checkStatus202);
};

const getAllMergedPullRequests = (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `is:merged is:pr -author:@me repo:${owner}/${repo} is:closed`;
    // console.log(q);
    return kit.rest.search
        .issuesAndPullRequests({
            q
        })
        .catch(formatGithubError)
        .then(checkStatus202);
};

const getAllClosedIssues = (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `is:closed is:issue repo:${owner}/${repo} linked:pr`;
    return kit.rest.search
        .issuesAndPullRequests({
            q
        })
        .catch(formatGithubError)
        .then(checkStatus202);
};

const getAllContributors = (auth, owner, repo) => {
    const kit = getKit(auth);
    return kit.rest.repos
        .getContributorsStats({
            owner,
            repo
        })
        .catch(formatGithubError)
        .then(checkStatus202);
};

module.exports = {
    getRepo,
    getMyCommits,
    getMyPullRequests,
    getAllMergedPullRequests,
    getAllClosedIssues,
    getAllContributors
};
