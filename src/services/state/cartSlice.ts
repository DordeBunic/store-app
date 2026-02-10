import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CartItem } from "@/models/CartItem";
import type { Product } from "@/models/Product";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import type { RootState } from "./store";
import { STORAGE_KEYS } from "@/constants/localStorage";
import { storage } from "@/utils/localStorage";

type CartState = {
  cartItems: CartItem[];
  loading: boolean;
  initialized: boolean;
};

const loadCartFromStorage = (): CartItem[] => {
  return storage.get<CartItem[]>(STORAGE_KEYS.CART_KEY) ?? [];
};

const saveCartToStorage = (items: CartItem[]) => {
  storage.set(STORAGE_KEYS.CART_KEY, items);
};

const initialState: CartState = {
  cartItems: loadCartFromStorage(),
  loading: false,
  initialized: false,
};

export const loadCart = createAsyncThunk<CartItem[]>(
  "cart/loadCart",
  async () => {
    const user = getAuth().currentUser;

    if (!user) {
      const local = loadCartFromStorage();
      saveCartToStorage(local);
      return local;
    }

    const ref = doc(db, "cart", user.uid);
    const snap = await getDoc(ref);

    const items = snap.exists() ? (snap.data().items ?? []) : [];
    saveCartToStorage(items);
    return items;
  },
);

const saveCartToFirestore = createAsyncThunk<
  void,
  CartItem[],
  { state: RootState }
>("cart/saveToFirestore", async (cartItems) => {
  const user = getAuth().currentUser;
  if (!user) return;

  const ref = doc(db, "cart", user.uid);
  await setDoc(ref, { items: cartItems }, { merge: true });
});

export const addItem = createAsyncThunk<
  void,
  { product: Product; count?: number },
  { state: RootState }
>("cart/addItem", async ({ product, count = 1 }, { dispatch, getState }) => {
  dispatch(cartSlice.actions.addItemLocal({ product, count }));

  const { cartItems, initialized } = getState().cart;
  saveCartToStorage(cartItems);

  if (initialized) {
    dispatch(saveCartToFirestore(cartItems));
  }
});

export const updateItem = createAsyncThunk<
  void,
  CartItem,
  { state: RootState }
>("cart/updateItem", async (item, { dispatch, getState }) => {
  dispatch(cartSlice.actions.updateItemLocal(item));

  const { cartItems, initialized } = getState().cart;
  saveCartToStorage(cartItems);

  if (initialized) {
    dispatch(saveCartToFirestore(cartItems));
  }
});

export const deleteItem = createAsyncThunk<void, number, { state: RootState }>(
  "cart/deleteItem",
  async (id, { dispatch, getState }) => {
    dispatch(cartSlice.actions.deleteItemLocal(id));

    const { cartItems, initialized } = getState().cart;
    saveCartToStorage(cartItems);

    if (initialized) {
      dispatch(saveCartToFirestore(cartItems));
    }
  },
);

export const deleteAllItems = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("cart/deleteAllItems", async (_, { dispatch, getState }) => {
  dispatch(cartSlice.actions.deleteAllItemsLocal());

  const { cartItems, initialized } = getState().cart;
  saveCartToStorage(cartItems);

  if (initialized) {
    dispatch(saveCartToFirestore(cartItems));
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemLocal: (
      state,
      action: PayloadAction<{ product: Product; count: number }>,
    ) => {
      const { product, count } = action.payload;
      const index = state.cartItems.findIndex((x) => x.item.id === product.id);

      if (index === -1) {
        state.cartItems.push({ item: product, count });
      } else {
        state.cartItems[index].count += count;
      }
    },

    updateItemLocal: (state, action: PayloadAction<CartItem>) => {
      const index = state.cartItems.findIndex(
        (x) => x.item.id === action.payload.item.id,
      );

      if (index === -1) return;

      if (action.payload.count === 0) {
        state.cartItems.splice(index, 1);
      } else {
        state.cartItems[index] = action.payload;
      }
    },

    deleteItemLocal: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.item.id !== action.payload,
      );
    },

    deleteAllItemsLocal: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
        state.initialized = true;
      })
      .addCase(loadCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
