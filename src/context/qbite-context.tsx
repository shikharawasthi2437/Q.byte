import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { foodItems, type CartLine, type FoodItem } from "@/data/qbite";

type QBiteContextValue = {
  cart: CartLine[];
  favorites: string[];
  cancelled: boolean;
  addToCart: (item: FoodItem) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, delta: number) => void;
  toggleFavorite: (id: string) => void;
  reorder: (items: { id: string; quantity: number }[]) => void;
  clearCart: () => void;
  cancelOrder: () => void;
  cartCount: number;
  cartTotal: number;
};

const QBiteContext = createContext<QBiteContextValue | undefined>(undefined);

export function QBiteProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState(["sandwich", "coffee", "maggi"]);
  const [cancelled, setCancelled] = useState(false);

  const addToCart = (item: FoodItem) => setCart((current) => {
    const found = current.find((line) => line.item.id === item.id);
    return found
      ? current.map((line) => line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line)
      : [...current, { item, quantity: 1 }];
  });
  const removeFromCart = (id: string) => setCart((current) => current.filter((line) => line.item.id !== id));
  const changeQuantity = (id: string, delta: number) => setCart((current) => current.flatMap((line) => {
    if (line.item.id !== id) return [line];
    const quantity = line.quantity + delta;
    return quantity > 0 ? [{ ...line, quantity }] : [];
  }));
  const toggleFavorite = (id: string) => setFavorites((current) => current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id]);
  const reorder = (items: { id: string; quantity: number }[]) => setCart((current) => {
    const next = [...current];
    items.forEach(({ id, quantity }) => {
      const item = foodItems.find((food) => food.id === id);
      if (!item || !item.available) return;
      const existing = next.find((line) => line.item.id === id);
      if (existing) existing.quantity += quantity;
      else next.push({ item, quantity });
    });
    return [...next];
  });
  const value = useMemo(() => ({
    cart, favorites, cancelled, addToCart, removeFromCart, changeQuantity, toggleFavorite, reorder,
    clearCart: () => setCart([]), cancelOrder: () => setCancelled(true),
    cartCount: cart.reduce((sum, line) => sum + line.quantity, 0),
    cartTotal: cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0),
  }), [cart, favorites, cancelled]);

  return <QBiteContext.Provider value={value}>{children}</QBiteContext.Provider>;
}

export function useQBite() {
  const context = useContext(QBiteContext);
  if (!context) throw new Error("useQBite must be used inside QBiteProvider");
  return context;
}
