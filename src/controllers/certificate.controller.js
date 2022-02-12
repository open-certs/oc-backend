const { getGithubRepo } = require('../helpers/github.helper');

exports.generateGithubCert = async (req, res) => {
    try {
        const user = req.user;

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
        return res.status(200).json({
            data: repo
        });
    } catch (e) {
        console.log(e);
        res.status(200).json({
            error: String(e)
        });
    }
};
