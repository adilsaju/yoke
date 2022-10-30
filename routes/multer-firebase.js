
const multer = require('multer');
const path = require('path');
const FirebaseStorage = require('multer-firebase-storage')


const storage =  FirebaseStorage({
    bucketName: 'yoke-e05d7.appspot.com',
    credentials: {
      clientEmail: 'firebase-adminsdk-qz0v0@yoke-e05d7.iam.gserviceaccount.com',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDVEjE7+BDzvEB0\nQgRwxB58VJNJPDyQL0nwhvrke2/pENYB9zmce9UdIl0DRKmoR/71FyWHtqEUvfYq\nHcKFg3aRD1ojPslrfJm7YQi4lMFk/V30mVXv1xIIWOs7bGEA7zfPazS6DMNRtkYQ\n4kjokpAu13jJKLF/Kw8O7j8Mn9+vARgRQi3XlLPYDiE1oX70d9Jnpu0o4KnTP2Dz\nXRAPFGch/XAdTayHTYTEb5XzHC8cfo+OPDTcBnSYIL9VU+VgDnfgpclkTXi4zLig\nAOVlwAiIrkt0T6y+BHpshCPXuwZEr4k3JheZU8dVph/qU+Yo/aNUr3/5fiBFCref\nvwPvadK9AgMBAAECggEAEQ6kR188CC8dX9E7JsXkhOKGafn7BTXr7uf3ZNwm4Nsa\nrsyaXZciP/NUy+KuzEx7Mia4t+0cZxsv/j4kqOiV0NYQSrsHh+XRLsl9V7183/dS\nkrbFxO4MQQPRTRAHkfoUlzPHZE+KQVvcrxRWbtvw0/cm8b+iugH58iGLhZi04P8J\nfUCTLEhNXMyvn4V1seUU8nwLNCdXyDqLegCqPYiNl4NuHvV+tiKY6WNBI6WlR1cC\nirDh4UMASNqwdSL/4qVJqoRJYtnnoEyMHp9/nVrhepq8XneaZtsywBTumz7seU1q\nM+mdXU4uRcpiLaWqLlK30bh4V5uEIYHqEFkSSkg8lwKBgQD0y+viai6v4SwJdlc5\nuSCKTmFokxO1XMGI4XqVe6hC8MqfmnBccnjYl5iaLznN2d3pxyWoCfG4QPifQ85e\nBTGG4oogXTRTgQZFUuh2G76jl2iNz0dEsB9AoirRVuLCJtjc6CbzzcI5g0XYDTmb\nFuMfgexKxq7cE1aocNh8NJ7/2wKBgQDe0pHHWQctKpQZP+6+9OSGW2/ve+/xlJsv\nEWoK07HczXxqEpt013TpRDqF1XX2WjSfWfaJl9nD719L6zIW0/AgdGmW95FBBVAz\neD+UpfuxhqumNqMEnPrvHwwSTjgWbxY0A6q8gFNJ2j+wA491ApeE8tSsU4iAuPWW\nNYFr4AunRwKBgQCFPWUjtHW6502HzPDHC1uJzAW63KrSgS0Z6thE+qxn2xX+bxoP\nR4M9KK435dKJl7bwoqN9ZgQ6LKrmTQrLI/qEF1PlL7XmaYjXPLwoZQuLkUKoRRTe\nbxpjnKC/lpIP6QMKohVpiCnaEfh3EyOypW9z28yYGrJcOO5m+hzq5d1RFwKBgQDA\ndEU/VjDxnO4PpP2z51ceiQl0YqrLENy8WaEqus/L85u7DllBIPs0ox6dC9L4Nc9v\nt0dObl7DchPwQbOgreugTIwKvceyzkEIQ5s+6+Ip4jSNunExAdlnAXzurqqZDdey\nk1w7tea6SgxqHZkhqlxuk0KHmRq0e4x68bnYD8pg7wKBgQCWitNVYz789YqtfyiV\nW8hvLyAcK1mED8dL+s4nZA9TLhJ+PMOk+obufUyqO9ICjCid0l86pMOcbKcI7rMo\nn3jQHOmbmvUIbhgW8rjkDDMMGl7CG5XCjvTm5yQPORwaXUXpoppE0a8PuL33v/ZJ\nQfBBzoRvMQ7u+Tjhd6f18wwqCg==\n-----END PRIVATE KEY-----\n',
      projectId: 'yoke-e05d7'
    },
    directoryPath: "yoke/",
    public: true,
    unique: true
  })


module.exports = storage
