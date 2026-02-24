import { getAuth, onAuthStateChanged } from "firebase/auth";

let authReadyPromise: Promise<void> | null = null;

export function waitForAuthReady(): Promise<void> {
  if (!authReadyPromise) {
    authReadyPromise = new Promise((resolve) => {
      const auth = getAuth();

      const unsubscribe = onAuthStateChanged(auth, () => {
        unsubscribe();
        resolve();
      });
    });
  }

  return authReadyPromise;
}
