const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

class Database {
    constructor() {
        this.uri = `mongodb+srv://insandouts-api:${process.env.MONGODB_PASS}@general.wfuxmik.mongodb.net/?appName=General`;
    }

    ping() {
        console.log('pong');
    }

    async getConnectedClient() {
        return new MongoClient(this.uri).connect();
    }

    async findOne(query) {
        let client = await this.getConnectedClient();

        try {
            let result = await client
                .db('insandouts')
                .collection('maps')
                .findOne(query);

            if (result) {
                return { ok: true, res: result };
            } else {
                return { ok: false, res: result };
            }
        } catch (err) {
            console.error(err);
        } finally {
            await client.close();
        }
    }

    async createMap(newMap) {
        let client = await this.getConnectedClient();

        try {
            let new_uuid = uuidv4();

            // true means it found the same uuid already so it cannot be used again
            while (this.findOne({ uuid: new_uuid }).ok) {
                new_uuid = uuidv4();
            }

            newMap['uuid'] = new_uuid;

            let result = await client
                .db('insandouts')
                .collection('maps')
                .insertOne(newMap);

            if (result) {
                return { ok: true, res: result };
            } else {
                return { ok: false, res: result };
            }
        } catch (err) {
            console.error(err);
        } finally {
            await client.close();
        }
    }

    // filter is usally the uuid
    async updateMap(filter, updatedMap) {
        let client = await this.getConnectedClient();

        try {
            let result = await client
                .db('insandouts')
                .collection('maps')
                .updateOne(filter, { $set: updatedMap });

            if (result) {
                return { ok: true, res: result };
            } else {
                return { ok: false, res: result };
            }
        } catch (err) {
            console.error(err);
        } finally {
            await client.close();
        }
    }
}

// (async () => {
//     d = new Database();

//     const result = await d.findOne({
//         uuid: 'e8f2ada4-56cf-4fcb-8405-bf0549f7d410',
//     });

//     console.log(result.res);

//     // const result = await d.createMap({ test_data: 'chat is this real?' });
//     // console.log(result.res);

//     // const result = await d.updateMap(
//     //     { uuid: 'e8f2ada4-56cf-4fcb-8405-bf0549f7d410' },
//     //     {
//     //         test_key: 'testing so good',
//     //     }
//     // );

//     // console.log(result.res);
// })();

module.exports = {
    Database: Database,
};
