const { Bitbucket } = require('bitbucket');

const getAuth = (token) => {
    return new Bitbucket({
        auth: { token }
    });
};

const getRepo = async (token, workspace, repo_slug) => {
    const bitbucket = getAuth(token);
    const data = await bitbucket.repositories.get({ repo_slug, workspace });
    return data;
};

const getMyPullRequests = async (token, repo_slug, workspace) => {
    const bitbucket = getAuth(token);
    const data = await bitbucket.pullrequests.get({ repo_slug, workspace });
    return data;
};

const getAllMergedPullRequests = async (token, state, repo_slug, workspace) => {
    const bitbucket = getAuth(token);
    const data = await bitbucket.pullrequests.list({
        repo_slug,
        state,
        workspace
    });
    return data;
};

const getAllClosedIssues = async (token, repo_slug, workspace) => {
    const bitbucket = getAuth(token);
    const q = `state = "closed"`;
    const data = await bitbucket.repositories.listIssues({
        repo_slug,
        workspace,
        q
    });
    return data;
};
// TODO: Fetch Contributors for public repos
const getAllContributors = async (token, workspace) => {
    const bitbucket = getAuth(token);
    const data = await bitbucket.workspaces
        .getMembersForWorkspace({
            workspace
        })
        .catch(() => ({ data: { size: 0 } }));
    return data;
};

const getForkList = async (token, repo_slug, workspace) => {
    const bitbucket = getAuth(token);
    const data = await bitbucket.repositories.listForks({
        repo_slug,
        workspace
    });
    return data;
};

const getRepoWatchers = async (token, repo_slug, workspace) => {
    const bitbucket = getAuth(token);
    const data = await bitbucket.repositories.listWatchers({
        repo_slug,
        workspace
    });
    return data;
};

const getRepoPermission = async (token, workspace, member) => {
    const bitbucket = getAuth(token);
    const data = await bitbucket.workspaces
        .getMemberForWorkspace({
            member,
            workspace
        })
        .then(() => true)
        .catch(() => false);
    return data;
};

module.exports = {
    getRepo,
    getMyPullRequests,
    getAllMergedPullRequests,
    getAllClosedIssues,
    getAllContributors,
    getForkList,
    getRepoWatchers,
    getRepoPermission
};
