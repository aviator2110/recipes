import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesScreen from "./FavoritesScreen";
import RecipeStack from "./RecipeStack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Recipes"
        component={RecipeStack}
        options={{ headerShown: false, title: "Рецепты" }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "Избранное" }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
