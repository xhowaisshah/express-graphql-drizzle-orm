import express, { Application } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './api/schema';
import dotenv from 'dotenv';


dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(port, (): void => {
  console.log(`Server is running at http://localhost:${port}`);
});