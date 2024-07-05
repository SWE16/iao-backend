const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

class Database {
    constructor() {
        this.uri = `mongodb+srv://insandouts-api:${process.env.MONGODB_PASS}@general.wfuxmik.mongodb.net/?appName=General`;

        this.client = new MongoClient(this.uri);
    }

    async findOne(query) {
        try {
            await this.client.connect();

            const result = await this.client
                .db('insandouts')
                .collection('maps')
                .findOne(query);

            if (result) {
                console.log(result);
            } else {
                console.log('Failed');
            }
        } catch (err) {
            console.error(err);
        } finally {
            await this.client.close();
        }
    }
}

d = new Database();

d.findOne({ uuid: 'e8f2ada4-56cf-4fcb-8405-bf0549f7d410' });
