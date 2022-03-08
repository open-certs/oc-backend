const mongoose = require('mongoose');
const CertificateImageSchema = new mongoose.Schema({
    src: { type: String },
    url: { type: String }
});

const CertificateSchema = new mongoose.Schema(
    {
        userGithubId: { type: String },
        userName: { type: String },
        projectRepo: { type: String },
        projectOwner: { type: String },
        commitCount: { type: Number, default: 0 },
        pullRequestCount: { type: Number, default: 0 },
        lastContributionDate: { type: Date },
        images: {
            type: [CertificateImageSchema],
            default: []
        }
    },
    { timestamps: true },
    { collection: 'certificates' }
);

CertificateSchema.statics.getById = (_id) => {
    return Certificate.findOne({ _id });
};

const Certificate = mongoose.model('certificates', CertificateSchema);
module.exports = Certificate;
