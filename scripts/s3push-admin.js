var admin = require("firebase-admin")

const uuid = require ("uuid-v4")


var serviceAccount = require("./sak.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "yoke-e05d7.appspot.com",
})

var bucket = admin.storage().bucket();

var filename = "./test.png"

async function uploadFile() {
    const metadata = {
        metadata: {
            //download token
            firebaseStorageDownloadTokens: uuid()
        },
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',

    };
    //uploads local file to bucket
    await bucket.upload(filename, {
        gzip: true, 
        metadata: metadata,
    })
    console.log(`${filename} uploaded`)

}

uploadFile().catch(console.error);


