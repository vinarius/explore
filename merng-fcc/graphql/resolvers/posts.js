const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        async getPosts(){
            try {
                return await Post.find().sort({ createdAt: -1 });
            } catch (error) {
                throw new Error(error);
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) return post;
                else throw new Error('Post not found');
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            try {
                const user = checkAuth(context);
                console.log(user);

                const newPost = new Post({
                    body,
                    user: user.indexOf,
                    username: user.username,
                    createdAt: new Date().toISOString()
                });

                return await newPost.save();
            } catch (error) {
                throw new Error(error);
            }
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);

            // Verify user created the post, no one else can delete it
            try {
                const post = await Post.findById(postId);
                if(user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        async likePost(parent, args, context) {
            const { postId } = args;
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);
            if(post) {
                if(post.likes.find(like => like.username === username)) {
                    // Post already liked
                    post.likes = post.likes.filter(like => like.username !== username);
                } else {
                    // Post not liked
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    });
                }
                await post.save();
            } else throw new UserInputError('post not found');
        }
    }
};