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

const getLastCommits = (auth, owner, repo) => {
    const kit = getKit(auth);
    const q = `
    query { 
        repository(name: "${repo}", owner: "${owner}") {
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 1) {
                  nodes {
                    message
                    committedDate
                    authoredDate
                    oid
                    author {
                      email
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
    return kit.graphql(q);
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
