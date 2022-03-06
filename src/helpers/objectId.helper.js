const { Types } = require('mongoose');

exports.validObjectId = (id) => {
    try {
        const objId = new Types.ObjectId(id);
        return Types.ObjectId.isValid(id) && String(id) == String(objId);
    } catch (e) {
        return false;
    }
};
