import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "./screens/Tabs";
import FavoritesProvider from "./context/FavoritesContext";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
