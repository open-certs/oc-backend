const {
    getGithubRepo,
    getCommits,
    getPullRequests
} = require('../helpers/github.helper');
const ejs = require('ejs');
const path = require('path');
const Certificate = require('../models/certificate.model');
const constants = require('../config/constants');
const NotFoundError = require('../errors/notFound.error');
const CustomError = require('../errors/custom.error');
const getLastContributionDate = (latestCommit, latestPullRequest) => {
    if (!latestCommit) {
        return latestPullRequest;
    }
    if (!latestPullRequest) {
        return latestCommit;
    }
    latestCommit = new Date(latestCommit);
    latestPullRequest = new Date(latestPullRequest);
    return latestCommit > latestPullRequest ? latestCommit : latestPullRequest;
};

exports.generateGithubCert = async (req, res, next) => {
    try {
        const user = req.user;
        // console.log(user);
        let repo = await getGithubRepo(
            user.accessToken,
            req.params.owner,
            req.params.repo
        );
        if (!repo) {
            throw new NotFoundError('Repo not found');
        }
        repo = repo.data;

        if (repo.private || repo.visibility !== 'public') {
            throw new CustomError(
                "Certificate can't be generated for private repos"
            );
        }
        if (repo.archived) {
            throw new CustomError(
                "Certificate can't be generated for archived repos"
            );
        }
        if (repo.source) {
            throw new CustomError("Certificate can't be generated for forks");
        }
        const [commits, pullRequests] = await Promise.all([
            getCommits(user.accessToken, req.params.owner, req.params.repo),
            getPullRequests(user.accessToken, req.params.owner, req.params.repo)
        ]);

        if (
            commits.data.total_count == 0 &&
            pullRequests.data.total_count == 0
        ) {
            throw new CustomError('No commits found by user');
        }

        const images = [constants.GITHUB_LOGO];

        const lastContributionDate = getLastContributionDate(
            commits.data.items[0]?.commit?.committer?.date,
            pullRequests.data.items[0]?.created_at
        );

        if (req.body.includeRepositoryImage) {
            images.push({
                src: repo.owner.avatar_url,
                url: repo.html_url
            });
        }
        if (req.body.includeUserImage) {
            images.push({
                src: user.avatar,
                url: user.profileUrl
            });
        }
        const certificate = await Certificate.create({
            userGithubId: user.username,
            userName: user.displayName,
            projectRepo: req.params.repo,
            projectOwner: req.params.owner,
            commitCount: commits.data.total_count,
            pullRequestCount: pullRequests.data.total_count,
            lastContributionDate,
            images
        });
        return res.status(200).json({
            certificate
            // data: repo
            // commits,
            // pullRequests
        });
    } catch (e) {
        next(e);
    }
};

exports.getCert = async (req, res, next) => {
    try {
        const certificate = await Certificate.getById(req.params.id).lean();
        if (!certificate) {
            throw new NotFoundError('Invalid Certificate Id');
        }
        // console.log({
        //     ...certificate,
        //     verifyAt: `${process.env.BASE_URL}/certificate/${certificate._id}`
        // });
        return res.render('certificateHolder', {
            html: await ejs.renderFile(
                path.join(__dirname, '../views/certificate.ejs'),
                {
                    data: {
                        ...certificate,
                        verifyAt: `${process.env.BASE_URL}/certificate/${certificate._id}`
                    }
                }
            )
        });
    } catch (e) {
        next(e);
    }
};

exports.getCertDetails = async (req, res, next) => {
    try {
        const cert_id = req.params.id;

        const certificate = await Certificate.getById(cert_id);
        if (!certificate) {
            throw new NotFoundError('Invalid Certificate Id');
        }

        res.status(200).json({
            certificate
        });
    } catch (e) {
        next(e);
    }
};
