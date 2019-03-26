import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import schema from './server/graphql';
import seeder from 'mongoose-seed';
import fs from 'fs';

dotenv.config()

const APP = express();

const PORT = process.env.PORT || 3001;

// Express only serves static assets in production
if (process.env.NODE_ENV === "development") {
    APP.use(express.static("client/build"));
}

console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV === "development"){
	const jsonData = JSON.parse(fs.readFileSync('data/output/seed.json', 'utf8'));
	seeder.connect(process.env.DB_CONNECTION, () => {
		seeder.loadModels([
			'server/models/Entity.js',
			'server/models/Biomarker.js',
			'server/models/Source.js',
			'server/models/Category.js',
			'server/models/Evidence.js'
		])
		seeder.clearModels(['Entity','Biomarker','Source','Category', 'Evidence'], () => {
			seeder.populateModels(jsonData, () => {
				//seeder.disconnect();
			})
		})
	})
}

mongoose.connect(process.env.DB_CONNECTION,
    {
        useCreateIndex: true,
        useNewUrlParser: true
    })
.then(() => {
	console.log("MongoDB connected")
})
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