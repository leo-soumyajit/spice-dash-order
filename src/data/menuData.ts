export interface MenuItem {
  name: string;
  price: number;
  half?: number;
}

export interface MenuCategory {
  [category: string]: MenuItem[];
}

export const menuData: MenuCategory = {
  "Chicken Items": [
    { name: "Chicken Pakora", price: 115 },
    { name: "Chicken Lolipop", price: 125 },
    { name: "Chicken Moglai", price: 90 },
    { name: "Egg Moglai", price: 60 },
    { name: "Chicken Kasha", price: 110 },
    { name: "Chilly Chicken", price: 120 },
    { name: "Chicken Butter Masala", price: 120 },
    { name: "Kadai Chicken", price: 140 },
    { name: "Chicken Punjabi", price: 150 },
    { name: "Chicken Manchurian", price: 130 },
    { name: "Chicken Rezala", price: 140 },
    { name: "Chicken Chaap", price: 120 },
    { name: "Chicken Bharta", price: 130 },
    { name: "Dry Chilly Chicken", price: 120 },
    { name: "Chicken Momo Steam (5pc)", price: 50 },
    { name: "Fry Momo", price: 60 },
    { name: "Chicken Tikka (5pc)", price: 100 },
    { name: "Reshmi Kabab (5pc)", price: 120 },
    { name: "Hariyali Kabab (5pc)", price: 130 },
    { name: "Pahari Kabab (5pc)", price: 120 },
    { name: "Chicken Leg Piece (1pc)", price: 60 },
    { name: "Chicken Stick (5pc)", price: 50 },
    { name: "Wings (1pc)", price: 30 },
    { name: "Tandooro Full", price: 400, half: 200 }
  ],
  "Vegetarian Items": [
    { name: "Mix Veg", price: 50 },
    { name: "Paneer Butter Masala", price: 150 },
    { name: "Mushroom Chilly", price: 130 },
    { name: "Tadka", price: 40 },
    { name: "Mushroom Butter Masala", price: 120 },
    { name: "Paneer Chilly", price: 100 },
    { name: "Chana Masala", price: 40 },
    { name: "Aloo Gobi", price: 50 },
    { name: "Egg Tadka", price: 50 }
  ],
  "Biryani": [
    { name: "Chicken Biryani", price: 120 },
    { name: "Aloo Biryani", price: 90 },
    { name: "Egg Biryani", price: 100 }
  ],
  "Bread": [
    { name: "Roti", price: 5 },
    { name: "Aloo Paratha", price: 25 },
    { name: "Butter Naan", price: 10 },
    { name: "Tandoori Roti", price: 7 },
    { name: "Mashala Kulcha", price: 30 }
  ],
  "Rolls": [
    { name: "Egg Roll", price: 40 },
    { name: "Egg Chicken Roll", price: 70 },
    { name: "Chicken Roll", price: 60 },
    { name: "Double Egg Roll", price: 50 },
    { name: "Paneer Roll", price: 60 },
    { name: "Lachha Roll", price: 20 }
  ],
  "Veg Rice": [
    { name: "Veg Rice", price: 70 },
    { name: "Paneer Rice", price: 100 },
    { name: "Veg Polao", price: 90 },
    { name: "Jeera Rice", price: 70 },
    { name: "Lemon Rice", price: 80 }
  ],
  "Non-Veg Rice": [
    { name: "Egg Rice", price: 80 },
    { name: "Chicken Rice", price: 120 },
    { name: "Mixed Rice", price: 150 }
  ],
  "Chowmein": [
    { name: "Veg Chowmein", price: 50, half: 30 },
    { name: "Egg Chowmein", price: 60, half: 40 },
    { name: "Egg Chicken Chowmein", price: 80, half: 50 },
    { name: "Paneer Chowmein", price: 90, half: 50 },
    { name: "Mixed Chowmein", price: 120, half: 70 },
    { name: "Chicken Chowmein", price: 70, half: 50 }
  ]
};

export const categories = Object.keys(menuData);
