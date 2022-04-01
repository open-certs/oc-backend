const {
    getGithubRepo,
    getAllClosedIssues,
    getAllMergedPullRequests,
    getAllContributors
} = require('../helpers/github.helper');

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
        reputation += constants.reputationWeight[key] * consideredData[key];
    });

    return reputation;
};
exports.getGithubRepo = async (req, res, next) => {
    try {
        const user = req.user;
        // console.log(user);
        let repo = await getGithubRepo(
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
            getAllMergedPullRequests(
                user.accessToken,
                req.params.owner,
                req.params.repo
            ),
            getAllClosedIssues(
                user.accessToken,
                req.params.owner,
                req.params.repo
            ),
            getAllContributors(
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
            provider: constants.GITHUB_LOGO
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
