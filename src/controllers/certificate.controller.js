const {
    getGithubRepo,
    getCommits,
    getPullRequests
} = require('../helpers/github.helper');
const ejs = require('ejs');
const path = require('path');
const CertificateSchema = require('../models/certificate');

exports.generateGithubCert = async (req, res) => {
    try {
        const user = req.user;
        // console.log(user);
        let repo = await getGithubRepo(
            user.accessToken,
            req.params.owner,
            req.params.repo
        );
        if (!repo) {
            throw new Error('Repo not found');
        }
        repo = repo.data;

        if (repo.private || repo.visibility !== 'public') {
            throw new Error("Certificate can't be generated for private repos");
        }
        if (repo.archived) {
            throw new Error(
                "Certificate can't be generated for archived repos"
            );
        }
        if (repo.source) {
            throw new Error("Certificate can't be generated for forks");
        }
        const [commits, pullRequests] = await Promise.all([
            getCommits(user.accessToken, req.params.owner, req.params.repo),
            getPullRequests(user.accessToken, req.params.owner, req.params.repo)
        ]);
        if (
            commits.data.total_count == 0 &&
            pullRequests.data.total_count == 0
        ) {
            throw new Error('No commits found by user');
        }
        const certificate = await CertificateSchema.create({
            userGithubId: user.username,
            userName: user.displayName,
            projectRepo: req.params.repo,
            projectOwner: req.params.owner,
            commitCount: commits.data.total_count,
            pullRequestCount: pullRequests.data.total_count,
            images: [
                'https://cdn-icons-png.flaticon.com/512/25/25231.png',
                repo.owner.avatar_url,
                user._json.avatar_url
            ]
        });
        return res.status(200).json({
            certificate
            // data: repo
            // commits,
            // pullRequests
        });
    } catch (e) {
        console.log(e);
        res.status(200).json({
            error: String(e)
        });
    }
};

exports.getCert = async (req, res) => {
    try {
        const certificate = await CertificateSchema.findById(
            req.params.id
        ).lean();
        if (!certificate) {
            throw new Error('Invalid Certificate Id');
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
        console.log(e);
        res.render('error', {
            message: String(e)
        });
    }
};
