const mongoose = require("mongoose");
const shortid = require("shortid");

const BlogSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `Blog-${shortid.generate()}`,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
},
{
    timestamps:
    {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
}
);

const BlogModel = mongoose.model('Blog', BlogSchema); 
module.exports = {
    BlogModel,
}
