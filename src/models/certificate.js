const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema(
    {
        userGithubId: String,
        userName: String,
        projectRepo: String,
        projectOwner: String,
        commitCount: Number,
        pullRequestCount: Number,
        images: { type: [String], default: [] }
    },
    { timestamps: true },
    { collection: 'certificates' }
);

module.exports = mongoose.model('certificates', CertificateSchema);
