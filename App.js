import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "./routes/Tabs";
import FavoritesProvider from "./context/FavoritesContext";
import RootDrawer from "./routes/RootDrawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-gesture-handler"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView>
      <FavoritesProvider>
        <NavigationContainer>
          <RootDrawer />
        </NavigationContainer>
      </FavoritesProvider>
    </GestureHandlerRootView>
  );
}
