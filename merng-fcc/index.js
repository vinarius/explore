const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { mongoUri } = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

(async () => {
    try {
        await mongoose.connect(mongoUri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const activeServer = await server.listen({ port: 5000 });
        console.log(`Server running on ${activeServer.url}`);   
    } catch (error) {
        console.error(`Error starting server:`, error);
    }
})();
