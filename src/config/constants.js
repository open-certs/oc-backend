module.exports = {
    AUTH_TOKEN_EXPIRY_HOURS: '1',

    PROJECT_TOKEN_EXPIRY_HOURS: '1',

    GITHUB_LOGO: {
        src: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
        url: 'https://github.com'
    },

    GITLAB_LOGO: {
        src: 'https://cdn-icons-png.flaticon.com/512/5968/5968853.png',
        url: 'https://gitlab.com'
    },

    BITBUCKET_LOGO: {
        src: 'https://cdn-icons-png.flaticon.com/512/6125/6125001.png',
        url: 'https://bitbucket.com'
    },

    GITHUB_SCOPES: [
        'public_repo',
        'read:user',
        'user:email',
        'read:org',
        'repo'
    ],

    BITBUCKET_SCOPES: [
        'repository',
        'account',
        'email',
        'issue',
        'pullrequest'
    ],

    GITLAB_SCOPES: ['read_api'],

    reputationWeight: {
        closedIssues: 6,
        stars: 9,
        forks: 7,
        openIssues: 4,
        license: 10,
        pullRequests: 6,
        contributors: 10,
        subscribers: 0
    },

    thresholdWeight: 250,

    categories: {
        bronze: 100,
        silver: 750,
        gold: 5000
    }
};
