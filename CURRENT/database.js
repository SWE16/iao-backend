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
            this.client.connect().then(() => {
                this.client
                    .db('insandouts')
                    .collection('maps')
                    .findOne(query)
                    .then((result) => {
                        if (result) {
                            return { ok: true, res: result };
                        } else {
                            return { ok: false, res: result };
                        }
                    });
            });
        } catch (err) {
            console.error(err);
        } finally {
            await this.client.close();
        }
    }

    async createMap(newMap) {
        try {
            this.client.connect().then(() => {
                let new_uuid = uuidv4();

                // true means it found the same uuid already so it cannot be used again
                while (this.findOne({ uuid: new_uuid }).ok) {
                    new_uuid = uuidv4();
                }

                newMap.uuid = new_uuid;

                console.log(new_uuid);

                this.client
                    .db('insandouts')
                    .collection('maps')
                    .insertOne(newMap)
                    .then((result) => {
                        console.log(result);
                        if (result) {
                            return { ok: true, res: result };
                        } else {
                            return { ok: false, res: result };
                        }
                    });
            });
        } catch (err) {
            console.error(err);
        } finally {
            await this.client.close();
        }
    }
}

(async () => {
    d = new Database();

    const result = await d.findOne({
        uuid: 'e8f2ada4-56cf-4fcb-8405-bf0549f7d410',
    });

    //const result = await d.createMap({ test_data: 'testing' });
    console.log(result);
    // console.log(result.res.insertedId);
})();
