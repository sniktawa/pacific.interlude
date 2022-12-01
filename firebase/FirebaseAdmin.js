import admin from 'firebase-admin';

try {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG)),
    })

    admin.firestore().settings({
        timestampsInSnapshots: true,
        ignoreUndefinedProperties: true
    })
} catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack)
    }
}

export class FirebaseAdmin {

    static firestore() {
        return admin.firestore();
    }

    static serverTimestamp() {
        return admin.firestore.FieldValue.serverTimestamp();
    }

    static auth() {
        return admin.auth();
    }

    static async getCollectionArray(collection) {
        const querySnapshot = await FirebaseAdmin.firestore().collection(collection).get();
        let result = []
        querySnapshot.forEach((doc) => {
            result.push({...doc.data(), id: doc.id})
        });
        return result;
    }

    static async query(collection, arg0, arg1, arg2) {
        const querySnapshot = await FirebaseAdmin.firestore().collection(collection).where(arg0, arg1, arg2).get();
        let result = []
        querySnapshot.forEach((doc) => {
            result.push({...doc.data(), id: doc.id})
        });
        return result;
    }

}

