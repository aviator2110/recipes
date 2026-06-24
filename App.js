import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesScreen from "./screens/FavoritesScreen";
import RecipeStack from "./screens/RecipeStack";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Рецепты" component={RecipeStack} />
        <Tab.Screen name="Избранное" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
