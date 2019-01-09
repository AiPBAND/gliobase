import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import schema from './graphql'

dotenv.config()

const APP = express();

const PORT = process.env.PORT;

mongoose.connect(process.env.DB_CONNECTION,
    {
        useCreateIndex: true,
        useNewUrlParser: true
    })
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const SERVER = new ApolloServer({
    schema: schema,
    playground: {
        endpoint: `http://localhost:${PORT}/graphql`,
        settings: {
            'editor.theme': 'light'
        }
    }
});

SERVER.applyMiddleware({
    app: APP
});

APP.listen(PORT, () => {
  console.log(`The server has started on port: ${PORT}`);
  console.log(`http://localhost:${PORT}/graphql`);
});

export default APP;