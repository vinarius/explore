const Post = require('../../models/Post');

module.exports = {
    Query: {
        async getPosts(){
            try {
                return await Post.find({}); // fetch all Post documents
            } catch (error) {
                throw new Error(error);
            }
        }
    }
};