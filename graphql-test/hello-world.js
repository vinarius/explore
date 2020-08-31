const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
      helloa: String
  }
`);

const root = { helloa: () => 'Hello worasdfld!' };

graphql(schema, '{ helloa }', root).then((response) => {
  console.log(JSON.stringify(response));
});