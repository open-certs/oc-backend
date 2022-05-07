const github = require('../helpers/github.helper');

const gitlab = require('../helpers/gitlab.helper');

const bitbuket = require('../helpers/bitbucket.helper');

const { sign } = require('../helpers/project.jwt.helper');
const constants = require('../config/constants');
const CustomError = require('../errors/custom.error');

const calculateReputation = ({
    closedIssues,
    stars,
    forks,
    openIssues,
    license,
    pullRequests,
    contributors,
    subscribers
}) => {
    let reputation = 0;
    const consideredData = {
        closedIssues,
        stars,
        forks,
        openIssues,
        license: license ? 1 : 0,
        pullRequests,
        contributors,
        subscribers
    };

    Object.keys(consideredData).forEach((key) => {
        reputation +=
            constants.reputationWeight[key] *
                Math.min(consideredData[key], 999) || 0;
    });

    return reputation;
};

exports.getBitBucketProjectToken = async (req, res, next) => {
    try {
        if (req.user.kind !== 'bitbucket') {
            throw new CustomError(
                'Login Credentials not found for current service!'
            );
        }
        const user = req.user;
        let repo = await bitbuket.getRepo(
            user.accessToken,
            req.params.workspace,
            req.params.repo
        );
        repo = repo.data;
        if (!repo) {
            throw new CustomError('Repository not found');
        }

        if (repo.is_private) {
            throw new CustomError('Private repositories not allowed.');
        }

        if (repo.parent) {
            throw new CustomError('Forked repositories not allowed.');
        }
        const [
            pullRequests,
            issues,
            contributors,
            permission,
            forkList,
            watchers
        ] = await Promise.all([
            bitbuket.getAllMergedPullRequests(
                user.accessToken,
                'MERGED',
                req.params.repo,
                req.params.workspace
            ),
            bitbuket.getAllClosedIssues(
                user.accessToken,
                req.params.repo,
                req.params.workspace
            ),
            bitbuket.getAllContributors(user.accessToken, req.params.workspace),
            bitbuket.getRepoPermission(
                user.accessToken,
                repo.workspace.slug,
                req.user.serviceId
            ),
            bitbuket.getForkList(
                user.accessToken,
                req.params.repo,
                req.params.workspace
            ),
            bitbuket.getRepoWatchers(
                user.accessToken,
                req.params.repo,
                req.params.workspace
            )
        ]);
        const accumulatedData = {
            name: repo.name,
            owner: repo.workspace.name,
            ownerAvatar: repo.links.avatar.href,
            forks: forkList.data.size,
            watchers: watchers.data.size,
            ownerLink: repo.workspace.links.html.href,
            repoLink: repo.links.html.href,
            repoSlug: repo.slug,
            workspaceSlug: repo.workspace.slug,
            permissions: { maintain: permission },
            pullRequests: pullRequests.data.size,
            closedIssues: issues.data.size,
            contributors: contributors.data.size,
            provider: constants.BITBUCKET_LOGO,
            service: 'bitbucket'
        };

        const reputation = calculateReputation(accumulatedData);
        // if (reputation < constants.thresholdWeight)
        //     throw new Error('Repository is not appropriate');

        let category = null;
        Object.keys(constants.categories).forEach((key) => {
            if (constants.categories[key] < reputation) {
                category = key;
            }
        });

        accumulatedData['category'] = category;
        accumulatedData['reputation'] = reputation;
        accumulatedData['thresholdWeight'] = constants.thresholdWeight;

        const token = sign(accumulatedData);
        res.status(200).json({
            accumulatedData,
            projectToken: token
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.getGitLabProjectToken = async (req, res, next) => {
    try {
        if (req.user.kind !== 'gitlab') {
            throw new CustomError(
                'Login Credentials not found for current service!'
            );
        }
        const user = req.user;
        const repo = await gitlab.getRepo(user.accessToken, req.params.id);
        if (!repo) {
            throw new CustomError('Repository not found');
        }

        if (repo.private || repo.visibility !== 'public') {
            throw new CustomError('Private repositories not allowed.');
        }
        if (repo.archived) {
            throw new CustomError('Archived repositories not allowed.');
        }
        if (repo.source) {
            throw new CustomError('Forked repositories not allowed.');
        }
        const [pullRequests, issues, contributors] = await Promise.all([
            gitlab.getAllMergedPullRequests(
                user.accessToken,
                req.params.id,
                req.user.username
            ),
            gitlab.getAllClosedIssues(user.accessToken, req.params.id),
            gitlab.getAllContributors(user.accessToken, req.params.id)
        ]);
        const accumulatedData = {
            name: repo.name,
            owner: repo.namespace.name,
            id: req.params.id,
            ownerAvatar: repo.avatar_url || repo.owner.avatar_url,
            ownerLink: repo.namespace.web_url,
            repoLink: repo.web_url,
            stars: repo.star_count,
            forks: repo.forks_count,
            openIssues: repo.open_issues_count,
            permissions: repo.permissions,
            pullRequests: pullRequests ? pullRequests.length : 0,
            closedIssues: issues,
            contributors: contributors.length,
            provider: constants.GITLAB_LOGO,
            service: 'gitlab'
        };

        const reputation = calculateReputation(accumulatedData);
        // if (reputation < constants.thresholdWeight)
        //     throw new Error('Repository is not appropriate');

        let category = null;
        Object.keys(constants.categories).forEach((key) => {
            if (constants.categories[key] < reputation) {
                category = key;
            }
        });

        accumulatedData['category'] = category;
        accumulatedData['reputation'] = reputation;
        accumulatedData['thresholdWeight'] = constants.thresholdWeight;

        const token = sign(accumulatedData);
        res.status(200).json({
            accumulatedData,
            projectToken: token
        });
    } catch (err) {
        next(err);
    }
};

exports.getGitHubProjectToken = async (req, res, next) => {
    try {
        if (req.user.kind !== 'github') {
            throw new CustomError(
                'Login Credentials not found for current service!'
            );
        }
        const user = req.user;
        let repo = await github.getRepo(
            user.accessToken,
            req.params.owner,
            req.params.repo
        );
        if (!repo) {
            throw new CustomError('Repository not found');
        }
        repo = repo.data;

        if (repo.private || repo.visibility !== 'public') {
            throw new CustomError('Private repositories not allowed.');
        }
        if (repo.archived) {
            throw new CustomError('Archived repositories not allowed.');
        }
        if (repo.source) {
            throw new CustomError('Forked repositories not allowed.');
        }

        const [pullRequests, issues, contributors] = await Promise.all([
            github.getAllMergedPullRequests(
                user.accessToken,
                req.params.owner,
                req.params.repo
            ),
            github.getAllClosedIssues(
                user.accessToken,
                req.params.owner,
                req.params.repo
            ),
            github.getAllContributors(
                user.accessToken,
                req.params.owner,
                req.params.repo
            )
        ]);
        const accumulatedData = {
            name: repo.name,
            owner: req.params.owner,
            ownerAvatar: repo.owner.avatar_url,
            ownerLink: repo.owner.html_url,
            repoLink: repo.homepage,
            stars: repo.stargazers_count,
            forks: repo.network_count,
            openIssues: repo.open_issues_count,
            license: repo.license,
            permissions: repo.permissions,
            pullRequests: pullRequests.data.total_count,
            closedIssues: issues.data.total_count,
            contributors: contributors.data.length,
            subscribers: repo.subscribers_count,
            provider: constants.GITHUB_LOGO,
            service: 'github'
        };
        const reputation = calculateReputation(accumulatedData);
        // if (reputation < constants.thresholdWeight)
        //     throw new Error('Repository is not appropriate');

        let category = null;
        Object.keys(constants.categories).forEach((key) => {
            if (constants.categories[key] < reputation) {
                category = key;
            }
        });

        accumulatedData['category'] = category;
        accumulatedData['reputation'] = reputation;
        accumulatedData['thresholdWeight'] = constants.thresholdWeight;

        const token = sign(accumulatedData);
        res.status(200).json({
            accumulatedData,
            projectToken: token
        });
    } catch (err) {
        next(err);
    }
};
