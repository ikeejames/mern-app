const Friends = require('../models/Friends');

const create = async (name, age, description) => {
    try {
        const result = await Friends.create({
            name,
            age,
            description
        });
        return result
    } catch (err) {
        console.log(err);
        return false;
    }
};

const retrieve = async () => {
    try {
        const results = await Friends.find().select('-__v');
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
};

const update = async (_id, obj) => {
    try {
        const results = await Friends.findByIdAndUpdate(_id, { $set: obj }, { new: true });
        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
};

const remove = async (_id) => {
    try {
        await Friends.findByIdAndDelete(_id);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

module.exports = {
    create, retrieve, update, remove
};