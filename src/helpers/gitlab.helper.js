const { Gitlab } = require('@gitbeaker/node');

const getGitlabApi = (token) => {
    return new Gitlab({
        oauthToken: token
    });
};

const getRepo = (token, id) => {
    const api = getGitlabApi(token);
    return api.Projects.show(id);
};

const getMyCommits = async (token, id, userEmail) => {
    const api = getGitlabApi(token);
    const commits = await api.Commits.all(id);
    return commits
        .filter((commit) => commit.author_email == userEmail)
        .sort((a, b) => b.created_at - a.created_at);
};

const getMyMergeRequests = (token, id) => {
    const api = getGitlabApi(token);
    return api.MergeRequests.all({
        projectId: id,
        scope: 'created_by_me',
        orderBy: 'created_at',
        sort: 'desc',
        state: 'merged'
    });
};

const getAllMergedPullRequests = (token, id, userName) => {
    const api = getGitlabApi(token);
    return api.MergeRequests.all({
        projectId: id,
        not: { authorUsername: userName },
        scope: 'all',
        state: 'merged',
        page: 1,
        perPage: 1000
    });
};

const getAllClosedIssues = async (token, id) => {
    const api = getGitlabApi(token);
    const issueStatistics = await api.IssuesStatistics.all({
        projectId: id,
        page: 1,
        perPage: 1000
    });
    return issueStatistics.statistics.counts.closed;
};

const getAllContributors = async (token, id) => {
    const api = getGitlabApi(token);
    return api.Repositories.contributors(id);
};

module.exports = {
    getRepo,
    getMyCommits,
    getMyMergeRequests,
    getAllMergedPullRequests,
    getAllClosedIssues,
    getAllContributors
};
