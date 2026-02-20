
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/services/api/firebase";
import type { Preferences } from "@/models/Prefrences";
import { loadPreferencesFromStorage } from "./storage";
import type { CartItem } from "@/models/CartItem";
import { STORAGE_KEYS } from "@/constants/localStorage";

export const loadPreferencesFromFirestore = async (): Promise<Preferences> => {
  const user = auth.currentUser!;
  const docRef = doc(db, STORAGE_KEYS.PREFERENCES_KEY, user.uid);
  const docSnap = await getDoc(docRef);

  const preferences = docSnap.exists()
    ? (docSnap.data() as Preferences)
    : loadPreferencesFromStorage();

  if (!docSnap.exists()) {
    await setDoc(docRef, loadPreferencesFromStorage());
  }
  return preferences;
};

export const savePreferencesToFirestore = async (preferences: Partial<Preferences>) => {
  const user = auth.currentUser!;
  const docRef = doc(db, STORAGE_KEYS.PREFERENCES_KEY, user.uid);
  await setDoc(docRef, preferences, { merge: true });
};

export const loadCartFromFirestore = async (): Promise<CartItem[]> => {
  const user = auth.currentUser!;
  const ref = doc(db, STORAGE_KEYS.CART_KEY, user.uid);
    const snap = await getDoc(ref);

  return snap.exists() ? (snap.data().items ?? []) : [];
};

export const saveCartToFirestore = async (cartItems: CartItem[]) => {
  const user = auth.currentUser!;
  const ref = doc(db, STORAGE_KEYS.CART_KEY, user.uid);
  await setDoc(ref, { items: cartItems }, { merge: true });
};
