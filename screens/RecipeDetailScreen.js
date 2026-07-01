import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const RecipeDetailsScreen = () => {
  const { recipe } = useRoute().params;
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: recipe.name });
  }, [recipe]);

  const [full, setFull] = useState();
  const [instructions, setInstructions] = useState("");
  const [smallInstructions, setSmallInstructions] = useState("");
  const [instructionsAreFull, setInstructionsAreFull] = useState(false);

  const getRecipe = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.id}`)
      .then((r) => r.json())
      .then((j) => setFull(j.meals[0]))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRecipe();
  }, [recipe.id]);

  const ingredients = [];

  if (full) {
    for (let i = 1; i <= 20; i++) {
      const ing = full["strIngredient" + i];
      const mea = full["strMeasure" + i];

      if (ing && ing.trim()) ingredients.push(`${ing} = ${mea}`);
    }
  }

  useEffect(() => {
    if (full) {
      setInstructions(full.strInstructions);
      setSmallInstructions(full.strInstructions.slice(0, 200));
    }
  }, [full]);

  // const openNext = () => {
  //   const i = RECIPES.findIndex((r) => r.id === recipe.id);
  //   const next = RECIPES[i + 1] % RECIPES.length;
  //   navigation.push("RecipeDetail", { recipeId: RECIPES[next].id });
  // };

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Sharing recipe",
        message: `Готовлю: ${recipe.name} (${recipe.area})`,
      });
    } catch (err) {}
  };

  let youtube = "";

  if (full) {
    youtube = full.strYoutube;
  }

  const onLinkYoutube = () => {
    Linking.openURL(youtube);
  };

  return (
    <ScrollView style={styles.screen}>
      <Image source={{ uri: recipe.thumb }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.meta}>Категория: {recipe.category}</Text>
        <Text style={styles.meta}>Страна: {recipe.area}</Text>
        <Text style={styles.section}>Ингредиенты:</Text>
        {ingredients.map((t) => {
          return (
            <Text key={t} style={styles.text}>
              {t}
            </Text>
          );
        })}
        <Text style={{ marginTop: 10, color: "#C0C0C0", fontSize: 18 }}>
          Инструкции: {instructionsAreFull ? instructions : smallInstructions}
          {instructions.length < 200 ? (
            <></>
          ) : (
            <Pressable onPress={() => setInstructionsAreFull((prev) => !prev)}>
              <Text style={{ color: "#181717" }}>
                {instructionsAreFull ? "   Show less" : "...Show more"}
              </Text>
            </Pressable>
          )}
        </Text>
      </View>
      <Pressable
        style={styles.pressable}
        onPress={() => {
          navigation.navigate("RecipeListByCategory", {
            recipeCategory: recipe.category,
          });
        }}
      >
        <Text>Ещё из этой категории</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={onShare}>
        <Text>Поделиться рецептом</Text>
      </Pressable>
      {youtube ? (
        <Pressable style={styles.pressable} onPress={onLinkYoutube}>
          <Text>Youtube video</Text>
        </Pressable>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 240 },
  body: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: "#1e293b" },
  meta: { fontSize: 14, color: "#64748b", marginTop: 4 },
  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 6,
    color: "#1e29eb",
  },
  text: { fontSize: 15, color: "#64748b", marginTop: 40 },
  pressable: {
    marginTop: 8,
    alignItems: "center",
    backgroundColor: "#759ddd",
    padding: 10,
  },
});

export default RecipeDetailsScreen;
