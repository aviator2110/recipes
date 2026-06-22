import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeListScreen from './screens/RecipeListScreen';
import { NavigationContainer } from '@react-navigation/native';
import RecipeDetailsScreen from './screens/RecipeDetailScreen';
import { Pressable, Text } from 'react-native';
import { RECIPES } from './data/recipes';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='RecipeList'
        screenOptions={{
          headerStyle: { backgroundColor: '#2823A' },
          headerTintColor: '#61DAFB',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen
          name='RecipeList'
          component={RecipeListScreen}
          options={{ title: "Что приготовить?" }}
        />
        <Stack.Screen
          name='RecipeDetail'
          component={RecipeDetailsScreen}
          options={({ navigation }) =>
          ({
            headerRight:
              () => {
                const r = RECIPES[Math.floor(Math.random() * RECIPES.length)]

                return (
                  <Pressable onPress={() => navigation.navigate('RecipeDetail', {recipeId: r.id})}>
                    <Text>Random recipe</Text>
                  </Pressable>
                )
              }
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}