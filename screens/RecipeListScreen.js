import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RECIPES } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import PressableCard from "../components/PressableCard";

const RecipeListScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const { width, height } = useWindowDimensions();
  const numColumns = width > height ? 3 : 2;

  const filtered = RECIPES.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const getMeals = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `https://themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const json = await res.json();
      const mapped = (json.meals || []).map((m) => ({
        id: m.idMeal,
        name: m.strMeal,
        category: m.strCategory,
        area: m.strArea,
        thumb: m.strMealThumb,
        instructions: m.strInstructions,
      }));
      setRecipes(mapped);
    } catch (err) {
      setError("Нет сети");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      getMeals();
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <View style={styles.screen}>
      <TextInput
        onChangeText={setQuery}
        placeholder="Searching recipe"
        placeholderTextColor={"#94a3b8"}
        style={styles.search}
      />
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size={"large"}
          color="#61DAFB"
        />
      ) : error ? (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{ textAlign: "center", marginTop: 40, color: "#FF0000" }}
          >
            {error}
          </Text>
          <Pressable
            style={{
              marginTop: 20,
              padding: 20,
              backgroundColor: "#73C2FB",
              borderRadius: 12,
            }}
            onPress={() => {
              getMeals();
            }}
          >
            <Text>Повторить</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={recipes}
          key={numColumns}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 6 }}
          renderItem={({ item }) => (
            <PressableCard
              onPress={() => {
                navigation.navigate("RecipeDetail", { recipe: item });
              }}
              style={{ flex: 1 / numColumns, padding: 7 }}
            >
              <RecipeCard recipe={item} />
            </PressableCard>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Nothing is found</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 8,
    backgroundColor: "#F4F7FA",
  },
  search: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginHorizontal: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  empty: { textAlign: "center", color: "#6478b", marginTop: 40 },
});

export default RecipeListScreen;
