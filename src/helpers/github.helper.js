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

module.exports = {
    getGithubRepo
};
