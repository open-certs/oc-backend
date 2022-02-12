var mongoose = require('mongoose');

var CertificateSchema = new mongoose.Schema(
    {
        userGithubId: String,
        userName: String,
        projectRepo: String,
        projectOwner: String,
        commitCount: Number,
        pullRequestCount: Number,
        images: [String]
    },
    { timestamps: true },
    { collection: 'certificates' }
);

module.exports = mongoose.model('certificates', CertificateSchema);
