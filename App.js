import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeListScreen from "./screens/RecipeListScreen";
import { NavigationContainer } from "@react-navigation/native";
import RecipeDetailsScreen from "./screens/RecipeDetailScreen";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { RECIPES } from "./data/recipes";
import RecipeListByCategory from "./screens/RecipeListByCategoryList";
import AboutAppScreen from "./screens/AboutAppScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="RecipeList"
        screenOptions={{
          headerStyle: { backgroundColor: "#2823A" },
          headerTintColor: "#61DAFB",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="RecipeList"
          component={RecipeListScreen}
          options={({ navigation }) => ({
            title: "Что приготовить?",

            headerRight: () => {
              const r = RECIPES[Math.floor(Math.random() * RECIPES.length)];

              return (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: 16}}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("RecipeDetail", {
                        recipeId: r.id,
                      })
                    }
                  >
                    <Image
                      style={styles.diceIcon}
                      source={require("./assets/icons/dice-cube-icon.png")}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('AboutApp')
                    }}
                  >
                    <Text style={{fontSize: 16, fontWeight: 500}}>О нас</Text>
                  </Pressable>
                </View>
              );
            },
          })}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetailsScreen}
          options={({ navigation }) => ({
            headerRight: () => {
              const r = RECIPES[Math.floor(Math.random() * RECIPES.length)];

              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate("RecipeDetail", { recipeId: r.id })
                  }
                >
                  <Image
                    style={styles.diceIcon}
                    source={require("./assets/icons/dice-cube-icon.png")}
                  />
                </Pressable>
              );
            },
          })}
        />
        <Stack.Screen
          name="RecipeListByCategory"
          component={RecipeListByCategory}
        />
        <Stack.Screen
          name="AboutApp"
          component={AboutAppScreen}
          options={{title: 'О приложении'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  diceIcon: { width: 50, height: 50 },
});
