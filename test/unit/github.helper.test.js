const GithubAPIError = require('../../src/errors/githubAPI.error');
const GithubAPITimeoutError = require('../../src/errors/githubAPITimeout.error');
const {
    getRepo,
    getMyCommits,
    getMyPullRequests
} = require('../../src/helpers/github.helper');

const data = {};
jest.mock('@octokit/rest', () => {
    const mf = async () => {
        if (data.error) throw data.error;
        return data.response;
    };
    return {
        Octokit: function () {
            this.rest = {
                search: {
                    commits: mf,
                    issuesAndPullRequests: mf
                },
                repos: {
                    get: mf,
                    getContributorsStats: mf
                }
            };
        }
    };
});

afterEach(() => {
    data.error = undefined;
    data.response = undefined;
});

test('should return GithubAPIUnavailableError when response status is 202', () => {
    data.response = {
        status: 202
    };
    const mAuth = {};
    const mOwner = 'owner';
    const mRepo = 'repo';
    const mCatch = jest.fn((err) => {
        expect(err).toBeTruthy();
        expect(err).toBeInstanceOf(GithubAPITimeoutError);
    });
    getRepo(mAuth, mOwner, mRepo)
        .catch(mCatch)
        .finally(() => {
            expect(mCatch).toBeCalledTimes(1);
        });
});

test('should return valid response when response is valid', () => {
    data.response = {
        status: 200
    };
    const mAuth = {};
    const mOwner = 'owner';
    const mRepo = 'repo';
    const mCatch = jest.fn();
    const mThen = jest.fn((res) => {
        expect(res).toBe(data.response);
    });
    getMyCommits(mAuth, mOwner, mRepo)
        .catch(mCatch)
        .then(mThen)
        .finally(() => {
            expect(mCatch).toBeCalledTimes(0);
            expect(mThen).toBeCalledTimes(1);
        });
});

test('should return GithubAPIError when response is invalid', () => {
    data.error = {
        response: {
            data: {
                message: 'message'
            }
        }
    };
    const mAuth = {};
    const mOwner = 'owner';
    const mRepo = 'repo';
    const mCatch = jest.fn((err) => {
        expect(err).toBeTruthy();
        expect(err).toBeInstanceOf(GithubAPIError);
        expect(err.message).toBe(data.error.response.data.message);
    });
    getMyPullRequests(mAuth, mOwner, mRepo)
        .catch(mCatch)
        .finally(() => {
            expect(mCatch).toBeCalledTimes(1);
        });
});
