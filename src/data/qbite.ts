export type FoodCategory = "Snacks" | "Meals" | "Beverages";
export type Diet = "veg" | "non-veg";
export type OrderStatus = "Pending" | "Accepted" | "Preparing" | "Ready" | "Completed" | "Cancelled";

export type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  diet: Diet;
  available: boolean;
  popular: boolean;
  prepMinutes: number;
  image: string;
};

export type CartLine = { item: FoodItem; quantity: number };

export const foodItems: FoodItem[] = [
  { id: "sandwich", name: "Veg Sandwich", description: "Fresh vegetables, mint chutney & toasted bread", price: 40, category: "Snacks", diet: "veg", available: true, popular: true, prepMinutes: 8, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80" },
  { id: "coffee", name: "Cold Coffee", description: "Chilled, creamy and campus-approved", price: 50, category: "Beverages", diet: "veg", available: true, popular: true, prepMinutes: 5, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80" },
  { id: "maggi", name: "Masala Maggi", description: "Classic noodles with vegetables and masala", price: 45, category: "Snacks", diet: "veg", available: true, popular: true, prepMinutes: 10, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=900&q=80" },
  { id: "paneer-roll", name: "Paneer Roll", description: "Spiced paneer, crunchy onions and green chutney", price: 65, category: "Meals", diet: "veg", available: true, popular: true, prepMinutes: 12, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80" },
  { id: "rajma-rice", name: "Rajma Rice Bowl", description: "Comforting rajma with steamed basmati rice", price: 75, category: "Meals", diet: "veg", available: true, popular: false, prepMinutes: 14, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80" },
  { id: "chicken-roll", name: "Chicken Roll", description: "Pepper chicken, onions and house sauce", price: 85, category: "Meals", diet: "non-veg", available: true, popular: false, prepMinutes: 15, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80" },
  { id: "samosa", name: "Samosa", description: "Crisp pastry with a spiced potato filling", price: 20, category: "Snacks", diet: "veg", available: false, popular: false, prepMinutes: 4, image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80" },
  { id: "lime", name: "Fresh Lime Soda", description: "Made fresh, sweet or salted", price: 35, category: "Beverages", diet: "veg", available: true, popular: false, prepMinutes: 4, image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80" },
];

export const notifications = [
  { id: 1, title: "Order Ready 🎉", body: "Your order QB104 is ready for pickup.", time: "Now", unread: true, kind: "ready" },
  { id: 2, title: "Food Preparing", body: "Your food is being prepared.", time: "8 min ago", unread: true, kind: "preparing" },
  { id: 3, title: "Order Accepted", body: "Your order QB104 has been accepted.", time: "12 min ago", unread: false, kind: "accepted" },
  { id: 4, title: "Pickup Reminder", body: "Your pickup slot starts in 5 minutes.", time: "Yesterday", unread: false, kind: "reminder" },
];

export const previousOrders = [
  { id: "QB098", status: "Completed" as OrderStatus, date: "8 Sep, 1:18 PM", total: 140, saved: 7, items: [{ id: "sandwich", quantity: 2 }, { id: "coffee", quantity: 1 }] },
  { id: "QB091", status: "Completed" as OrderStatus, date: "3 Sep, 12:42 PM", total: 120, saved: 5, items: [{ id: "paneer-roll", quantity: 1 }, { id: "lime", quantity: 1 }, { id: "samosa", quantity: 1 }] },
];

export const pickupSlots = [
  { id: "1320", label: "1:20 PM – 1:25 PM", spots: 8, tone: "good", recommended: true },
  { id: "1325", label: "1:25 PM – 1:30 PM", spots: 2, tone: "low", recommended: false },
  { id: "1330", label: "1:30 PM – 1:35 PM", spots: 0, tone: "full", recommended: false },
  { id: "1335", label: "1:35 PM – 1:40 PM", spots: 11, tone: "good", recommended: false },
];

export const activeOrder = {
  id: "QB104",
  status: "Preparing" as OrderStatus,
  pickup: "1:20 PM – 1:25 PM",
  readyAt: "1:24 PM",
  counter: "Main Canteen · Counter 2",
  ordersAhead: 12,
  estimatedMinutes: 15,
  items: [{ id: "maggi", quantity: 1 }, { id: "coffee", quantity: 1 }],
  total: 95,
};
