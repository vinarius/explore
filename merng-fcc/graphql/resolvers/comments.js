const { UserInputError, AuthenticationError } = require('apollo-server');

const checkAuth = require('../../utils/checkAuth');
const Post = require('../../models/Post');
const User = require('../../models/User');

module.exports = {
    Mutation: {
        async createComment(_, args, context) {
            try {
                const { postId, body } = args;
                if(body.trim() === '') {
                    throw new UserInputError('empty comment', {
                        errors: {
                            body: 'Comment must not be empty'
                        }
                    });
                }

                const { username } = checkAuth(context);

                const post = await Post.findById(postId);

                if(post) {
                    post.comments.unshift({
                        body,
                        username,
                        createdAt: new Date().toISOString()
                    });

                    post.save();
                    return post;
                } else {
                    throw new UserInputError('Post not found');
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        async deleteComment(_, args, context) {
            try {
                const { postId, commendId } = args;
                const { username } = checkAuth(context);

                const post = await Post.findById(postId);

                if(post) {
                    const commentIndex = post.comments.findIndex(comment => comment.id === commentId);

                    if(post.comments[commentIndex].username === username) {
                        post.comments.splice(commentIndex, 1);
                        await post.save();
                        return post;
                    } else {
                        throw new AuthenticationError('Action not allowed');
                    }
                } else {
                    throw new UserInputError('post not found');
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    }
};