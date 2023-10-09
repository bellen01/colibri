import { getApps, cert } from "firebase-admin/app";
import * as admin from 'firebase-admin'

const firebaseAdminConfig = {
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    })
}

export function customInitApp() {
    if (getApps().length <= 0) {
        admin.initializeApp(firebaseAdminConfig)
    }
}