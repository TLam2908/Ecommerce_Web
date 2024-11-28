import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product as ProductType } from "../../types";
import toast from "react-hot-toast";

interface CartItem {
  product: ProductType;
  quantity: number; // Quantity the user wants to buy
}

interface CartStore {
  items: CartItem[];
  addItem: (product: ProductType, quantity: number) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  increaseQuantity: (id: string, amount?: number) => void;
  decreaseQuantity: (id: string, amount?: number) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (product: ProductType, quantity: number) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) => item.product.id === product.id
        );

        const availableStock = Number(product.quantity);
        let totalDesiredQuantity = quantity;

        if (existingItemIndex !== -1) {
          totalDesiredQuantity += items[existingItemIndex].quantity;
        }

        if (totalDesiredQuantity > availableStock) {
          toast.error("Cannot add more than available stock");
          return;
        }

        if (existingItemIndex !== -1) {
          // Item exists, update quantity
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
          toast.success("Increased item quantity in cart");
        } else {
          // Add new item
          const newItem: CartItem = { product, quantity };
          set({ items: [...items, newItem] });
          toast.success("Item added to cart");
        }
      },
      removeItem: (id: string) => {
        const { items } = get();
        const updatedItems = items.filter(
          (item) => item.product.id !== id
        );
        set({ items: updatedItems });
        toast.success("Item removed from cart");
      },
      removeAll: () => {
        set({ items: [] });
      },
      increaseQuantity: (id: string, amount: number = 1) => {
        const { items } = get();
        const updatedItems = items.map((item) => {
          if (item.product.id === id) {
            const newQuantity = item.quantity + amount;
            if (newQuantity > Number(item.product.quantity)) {
              toast.error("Cannot exceed available stock");
              return item;
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        set({ items: updatedItems });
      },
      decreaseQuantity: (id: string, amount: number = 1) => {
        const { items } = get();
        const updatedItems = items
          .map((item) => {
            if (item.product.id === id) {
              const newQuantity = item.quantity - amount;
              if (newQuantity <= 0) {
                toast.success("Item removed from cart");
                return null; // Mark for removal
              }
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
          .filter(Boolean) as CartItem[]; // Remove nulls
        set({ items: updatedItems });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
