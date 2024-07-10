import { auth } from "./config";

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";

export const createEmailandPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signInEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const output = await signInWithPopup(auth, provider);
    output.user

    return output
}

export const signOut = async () => {
    await auth.signOut();
};
