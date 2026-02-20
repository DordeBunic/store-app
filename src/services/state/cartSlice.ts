import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CartItem } from "@/models/CartItem";
import type { Product } from "@/models/Product";
import { getAuth } from "firebase/auth";
import type { RootState } from "./store";
import { loadCartFromStorage, saveCartToStorage } from "@/utils/helpers/storage";
import { loadCartFromFirestore, saveCartToFirestore } from "@/utils/helpers/firestoreStorage";

type CartState = {
  cartItems: CartItem[];
  loading: boolean;
  initialized: boolean;
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
      return [];
    }

    const items = await loadCartFromFirestore();
    saveCartToStorage(items);

    return items;
  },
);

const saveCart = createAsyncThunk<
  void,
  CartItem[],
  { state: RootState }
>("cart/saveToFirestore", async (cartItems) => {
  const user = getAuth().currentUser;
  if (!user) return;

  saveCartToFirestore(cartItems)
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
    dispatch(saveCart(cartItems));
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
    dispatch(saveCart(cartItems));
  }
});

export const deleteItem = createAsyncThunk<void, number, { state: RootState }>(
  "cart/deleteItem",
  async (id, { dispatch, getState }) => {
    dispatch(cartSlice.actions.deleteItemLocal(id));

    const { cartItems, initialized } = getState().cart;
    saveCartToStorage(cartItems);

    if (initialized) {
      dispatch(saveCart(cartItems));
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
    dispatch(saveCart(cartItems));
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
