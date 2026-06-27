import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "./Tabs";
import AboutAppScreen from "../screens/AboutAppScreen";
import "react-native-gesture-handler"

const Drawer = createDrawerNavigator();

const RootDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Main"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="About" component={AboutAppScreen} />
    </Drawer.Navigator>
  );
};

export default RootDrawer;
