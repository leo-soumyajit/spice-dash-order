export interface MenuItem {
  name: string;
  price: number;
  half?: number;
  description: string;
  image: string;
}

export interface MenuCategory {
  [category: string]: MenuItem[];
}

export const menuData: MenuCategory = {
  "Chicken Items": [
    { name: "Chicken Pakora", price: 115, description: "Crispy deep-fried chicken fritters marinated with aromatic spices and gram flour coating. Served hot with mint chutney.", image: "chicken-pakora" },
    { name: "Chicken Lolipop", price: 125, description: "Indo-Chinese style chicken drumettes marinated in spicy batter, deep-fried until golden and crispy. A perfect appetizer.", image: "chicken-pakora" },
    { name: "Chicken Moglai", price: 90, description: "Rich and creamy Mughlai-style chicken curry cooked in a blend of cashew paste, yogurt, and aromatic spices.", image: "chicken-curry" },
    { name: "Egg Moglai", price: 60, description: "Boiled eggs simmered in a luxurious Mughlai gravy with cream, cashews, and fragrant spices.", image: "chicken-curry" },
    { name: "Chicken Kasha", price: 110, description: "Traditional Bengali-style dry chicken curry with whole spices, slow-cooked to perfection with rich flavors.", image: "chicken-curry" },
    { name: "Chilly Chicken", price: 120, description: "Popular Indo-Chinese dish with crispy chicken pieces tossed in spicy chili sauce with bell peppers and onions.", image: "chicken-curry" },
    { name: "Chicken Butter Masala", price: 120, description: "Tender chicken pieces in a silky smooth tomato-based gravy enriched with butter, cream, and aromatic spices.", image: "chicken-curry" },
    { name: "Kadai Chicken", price: 140, description: "Spicy chicken cooked in a traditional iron kadai with bell peppers, tomatoes, and freshly ground kadai masala.", image: "chicken-curry" },
    { name: "Chicken Punjabi", price: 150, description: "Authentic Punjabi-style chicken curry with rich onion-tomato gravy, flavored with traditional spices and cream.", image: "chicken-curry" },
    { name: "Chicken Manchurian", price: 130, description: "Crispy chicken balls in a tangy, spicy Indo-Chinese sauce with hints of soy sauce, vinegar, and garlic.", image: "chicken-curry" },
    { name: "Chicken Rezala", price: 140, description: "Aromatic Bengali white chicken curry made with yogurt, poppy seeds, and cashews. Delicately spiced and creamy.", image: "chicken-curry" },
    { name: "Chicken Chaap", price: 120, description: "Tender chicken pieces marinated in yogurt and spices, slow-cooked in a rich, flavorful gravy.", image: "chicken-curry" },
    { name: "Chicken Bharta", price: 130, description: "Shredded chicken cooked with mashed potatoes, onions, and spices. A unique and flavorful dish.", image: "chicken-curry" },
    { name: "Dry Chilly Chicken", price: 120, description: "Boneless chicken stir-fried with green chilies, bell peppers, and onions in a spicy, dry preparation.", image: "chicken-pakora" },
    { name: "Chicken Momo Steam (5pc)", price: 50, description: "Steamed dumplings filled with seasoned minced chicken and vegetables. Served with spicy red chutney.", image: "chicken-pakora" },
    { name: "Fry Momo", price: 60, description: "Crispy pan-fried momos filled with juicy chicken mixture. Perfectly golden and crunchy outside, soft inside.", image: "chicken-pakora" },
    { name: "Chicken Tikka (5pc)", price: 100, description: "Succulent boneless chicken pieces marinated in yogurt and tandoori spices, grilled in a clay oven.", image: "chicken-pakora" },
    { name: "Reshmi Kabab (5pc)", price: 120, description: "Silky smooth chicken kebabs made with minced chicken, cream, and mild spices. Melt-in-mouth texture.", image: "chicken-pakora" },
    { name: "Hariyali Kabab (5pc)", price: 130, description: "Green chicken kebabs marinated in mint, coriander, and spinach paste. Fresh and aromatic.", image: "chicken-pakora" },
    { name: "Pahari Kabab (5pc)", price: 120, description: "Mountain-style chicken kebabs marinated in yogurt, capsicum, and mint with a smoky charcoal flavor.", image: "chicken-pakora" },
    { name: "Chicken Leg Piece (1pc)", price: 60, description: "Juicy chicken leg piece marinated in special tandoori masala and grilled to perfection.", image: "chicken-pakora" },
    { name: "Chicken Stick (5pc)", price: 50, description: "Tender chicken strips on skewers, marinated with spices and grilled. Perfect finger food.", image: "chicken-pakora" },
    { name: "Wings (1pc)", price: 30, description: "Spicy grilled chicken wings marinated in tandoori spices. Crispy outside, juicy inside.", image: "chicken-pakora" },
    { name: "Tandooro Full", price: 400, half: 200, description: "Whole chicken marinated overnight in yogurt and tandoori spices, roasted in a clay oven. Serves 3-4 people.", image: "chicken-pakora" }
  ],
  "Vegetarian Items": [
    { name: "Mix Veg", price: 50, description: "Colorful medley of fresh seasonal vegetables cooked in a mildly spiced gravy with tomatoes and onions.", image: "vegetarian" },
    { name: "Paneer Butter Masala", price: 150, description: "Soft paneer cubes in a rich, creamy tomato-based gravy with butter and aromatic spices. A classic favorite.", image: "vegetarian" },
    { name: "Mushroom Chilly", price: 130, description: "Fresh mushrooms tossed in spicy Indo-Chinese sauce with bell peppers, onions, and green chilies.", image: "vegetarian" },
    { name: "Tadka", price: 40, description: "Yellow lentils tempered with ghee, cumin, garlic, and dried red chilies. Simple yet flavorful comfort food.", image: "vegetarian" },
    { name: "Mushroom Butter Masala", price: 120, description: "Tender mushrooms cooked in a creamy tomato-cashew gravy enriched with butter and mild spices.", image: "vegetarian" },
    { name: "Paneer Chilly", price: 100, description: "Crispy paneer cubes stir-fried with bell peppers, onions, and green chilies in a spicy Indo-Chinese sauce.", image: "vegetarian" },
    { name: "Chana Masala", price: 40, description: "Chickpeas simmered in a tangy tomato-onion gravy with aromatic spices. Healthy and delicious.", image: "vegetarian" },
    { name: "Aloo Gobi", price: 50, description: "Classic combination of potatoes and cauliflower cooked with turmeric, cumin, and traditional spices.", image: "vegetarian" },
    { name: "Egg Tadka", price: 50, description: "Boiled eggs cooked in a spicy onion-tomato tadka gravy. Simple and satisfying.", image: "vegetarian" }
  ],
  "Biryani": [
    { name: "Chicken Biryani", price: 120, description: "Fragrant basmati rice layered with tender chicken pieces, aromatic spices, saffron, and fried onions. Served with raita.", image: "biryani" },
    { name: "Aloo Biryani", price: 90, description: "Vegetarian delight with spiced potatoes layered with fragrant basmati rice, herbs, and aromatic spices.", image: "biryani" },
    { name: "Egg Biryani", price: 100, description: "Flavorful biryani with boiled eggs layered in aromatic basmati rice with whole spices and saffron.", image: "biryani" }
  ],
  "Bread": [
    { name: "Roti", price: 5, description: "Soft, thin whole wheat flatbread cooked on a tawa. Perfect accompaniment to any curry.", image: "bread" },
    { name: "Aloo Paratha", price: 25, description: "Stuffed whole wheat flatbread filled with spiced mashed potatoes. Served with butter, curd, and pickle.", image: "bread" },
    { name: "Butter Naan", price: 10, description: "Soft, fluffy leavened bread baked in a tandoor and brushed with butter. A classic favorite.", image: "bread" },
    { name: "Tandoori Roti", price: 7, description: "Whole wheat flatbread baked in a traditional clay tandoor oven. Slightly smoky and crispy.", image: "bread" },
    { name: "Mashala Kulcha", price: 30, description: "Leavened bread stuffed with spiced onions, paneer, and herbs. Baked in tandoor and brushed with butter.", image: "bread" }
  ],
  "Rolls": [
    { name: "Egg Roll", price: 40, description: "Soft paratha wrapped around spiced egg omelet with onions, green chilies, and sauces. Quick and tasty.", image: "rolls" },
    { name: "Egg Chicken Roll", price: 70, description: "Delicious combination of egg and chicken tikka wrapped in paratha with veggies and tangy sauces.", image: "rolls" },
    { name: "Chicken Roll", price: 60, description: "Succulent chicken tikka pieces wrapped in soft paratha with onions, mint chutney, and spicy sauces.", image: "rolls" },
    { name: "Double Egg Roll", price: 50, description: "Double the eggs for extra protein! Spiced egg omelet wrapped in paratha with fresh vegetables.", image: "rolls" },
    { name: "Paneer Roll", price: 60, description: "Grilled paneer cubes with onions, bell peppers, and sauces wrapped in soft paratha. Perfect vegetarian option.", image: "rolls" },
    { name: "Lachha Roll", price: 20, description: "Simple yet delicious plain lachha paratha roll with basic seasonings and sauces.", image: "rolls" }
  ],
  "Veg Rice": [
    { name: "Veg Rice", price: 70, description: "Colorful fried rice with mixed vegetables, aromatic spices, and herbs. Light yet satisfying.", image: "veg-rice" },
    { name: "Paneer Rice", price: 100, description: "Fried rice with soft paneer cubes, vegetables, and Indo-Chinese flavors. Rich and protein-packed.", image: "veg-rice" },
    { name: "Veg Polao", price: 90, description: "Fragrant basmati rice cooked with mixed vegetables, whole spices, and aromatic herbs.", image: "veg-rice" },
    { name: "Jeera Rice", price: 70, description: "Simple basmati rice tempered with cumin seeds and ghee. Perfect with any curry.", image: "veg-rice" },
    { name: "Lemon Rice", price: 80, description: "South Indian style rice flavored with lemon juice, curry leaves, peanuts, and turmeric.", image: "veg-rice" }
  ],
  "Non-Veg Rice": [
    { name: "Egg Rice", price: 80, description: "Tasty fried rice with scrambled eggs, vegetables, and savory sauces. Protein-rich and delicious.", image: "non-veg-rice" },
    { name: "Chicken Rice", price: 120, description: "Flavorful fried rice with tender chicken pieces, vegetables, and aromatic spices.", image: "non-veg-rice" },
    { name: "Mixed Rice", price: 150, description: "Loaded fried rice with chicken, egg, and vegetables. A complete meal in itself.", image: "non-veg-rice" }
  ],
  "Chowmein": [
    { name: "Veg Chowmein", price: 50, half: 30, description: "Classic Hakka noodles stir-fried with fresh vegetables, garlic, and savory sauces. Light and healthy.", image: "chowmein" },
    { name: "Egg Chowmein", price: 60, half: 40, description: "Hakka noodles tossed with scrambled eggs, vegetables, and Indo-Chinese sauces. Perfect balance.", image: "chowmein" },
    { name: "Egg Chicken Chowmein", price: 80, half: 50, description: "Best of both worlds - noodles with chicken and eggs, vegetables, and flavorful sauces.", image: "chowmein" },
    { name: "Paneer Chowmein", price: 90, half: 50, description: "Hakka noodles with soft paneer cubes, colorful vegetables, and spicy-tangy sauce.", image: "chowmein" },
    { name: "Mixed Chowmein", price: 120, half: 70, description: "Ultimate chowmein loaded with chicken, egg, paneer, vegetables, and special sauces. Most popular!", image: "chowmein" },
    { name: "Chicken Chowmein", price: 70, half: 50, description: "Delicious noodles stir-fried with tender chicken pieces, crunchy vegetables, and aromatic sauces.", image: "chowmein" }
  ]
};

export const categories = Object.keys(menuData);
