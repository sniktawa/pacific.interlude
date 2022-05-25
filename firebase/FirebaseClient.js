import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    updateEmail,
    updatePassword,
    sendEmailVerification,
    deleteUser as deleteUserAccount,
    sendPasswordResetEmail
} from 'firebase/auth';
import {
    collection,
    addDoc,
    doc,
    getDoc,
    query,
    where,
    getDocs,
    collectionGroup,
    setDoc,
    serverTimestamp,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';

let firebaseApp;
let firebaseAnalytics;

if (typeof window !== 'undefined') {
    try {
        firebaseApp = initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG))
        firebaseAnalytics = getAnalytics(firebaseApp);
    } catch (error) {
        /*
         * We skip the "already exists" message which is
         * not an actual error when we're hot-reloading.
         */
        if (!/duplicate-app/u.test(error.message)) {
            console.error('Firebase initialization error', error.stack)
        }
    }
}

let firebaseDb;
let firebaseAuth;

if (typeof window !== 'undefined') {
    firebaseDb = getFirestore(firebaseApp)
    firebaseAuth = getAuth();
}

export class FirebaseClient {

    static db() {
        return firebaseDb;
    }

    static auth() {
        return firebaseAuth;
    }

    static async createUser(email, password) {
        return await createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    static async deleteUser(user) {
        return await deleteUserAccount(user);
    }

    static async updateUser(user, data, email, password) {
        if (typeof window !== 'undefined') {
            if (email) {
                await updateEmail(user, email);
            }
            if (password) {
                await updatePassword(user, password);
            }
            await updateProfile(user, data);
        }
    }

    static async sendVerificationEmail(user) {
        return await sendEmailVerification(user);
    }

    static async sendPasswordResetEmail(email) {
        return await sendPasswordResetEmail(firebaseAuth, email);
    }

    static async signOut() {
        return await signOut(firebaseAuth);
    }

    static async signIn(email, password) {
        return await signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    static async collection(collectionName) {
        if (typeof window !== 'undefined') {
            const querySnapshot = await getDocs(query(collection(firebaseDb, collectionName)));
            let result = []
            querySnapshot.forEach((doc) => {
                result.push({...doc.data(), id: doc.id})
            });
            return result;
        }
    }

    static async query(collectionName, ...where) {
        if (typeof window !== 'undefined') {
            const q = query(collection(firebaseDb, collectionName), ...where);
            const querySnapshot = await getDocs(q);
            let result = []
            querySnapshot.forEach((doc) => {
                result.push({...doc.data(), id: doc.id})
            });
            return result;
        }
    }

    static async doc(collectionName, docId) {
        if (typeof window !== 'undefined') {
            const docRef = doc(firebaseDb, collectionName, docId)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return {...docSnap.data(), id: docId};
            }
        }
    }

    static async set(collectionName, docId, data) {
        if (typeof window !== 'undefined') {
            removeUndefined(data);
            delete data['id']
            await setDoc(doc(firebaseDb, collectionName, docId), data);
            await updateDoc(doc(firebaseDb, collectionName, docId), {
                created_at: serverTimestamp(),
                updated_at: serverTimestamp()
            });
            return await this.doc(collectionName, docId);
        }
    }

    static async add(collectionName, data) {
        if (typeof window !== 'undefined') {
            removeUndefined(data);
            delete data['id']
            let docRef = await addDoc(collection(firebaseDb, collectionName), data);

            await updateDoc(doc(firebaseDb, collectionName, docRef.id), {
                created_at: serverTimestamp()
            });
            return await this.doc(collectionName, docRef.id);
        }
    }

    static async update(collectionName, docId, data) {
        if (typeof window !== 'undefined') {
            removeUndefined(data);
            await updateDoc(doc(firebaseDb, collectionName, docId), {...data, updated_at: serverTimestamp()});
            return await this.doc(collectionName, docId);
        }
    }

    static async delete(collectionName, docId) {
        return await deleteDoc(doc(firebaseDb, collectionName, docId));
    }
}

function removeUndefined(obj) {
    Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {})
}
