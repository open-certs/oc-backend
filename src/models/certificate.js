const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema(
    {
        userGithubId: String,
        userName: String,
        projectRepo: String,
        projectOwner: String,
        commitCount: Number,
        pullRequestCount: Number,
        lastCommitDate: Date,
        images: {
            type: [
                {
                    src: String,
                    url: String
                }
            ],
            default: [],
            _id: false
        }
    },
    { timestamps: true },
    { collection: 'certificates' }
);

module.exports = mongoose.model('certificates', CertificateSchema);
