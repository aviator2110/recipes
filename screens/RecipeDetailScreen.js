import { useEffect } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useRoute } from "@react-navigation/native"
import { RECIPES } from "../data/recipes"

const RecipeDetailsScreen = () => {
    const { recipeId } = useRoute().params
    const recipe = RECIPES.find((item) => recipeId === item.id)
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({ title: recipe.name })
    }, [recipe])

    const openNext = () => {
        const i = RECIPES.findIndex(r => r.id === recipe.id)
        const next = RECIPES[i + 1] % RECIPES.length
        navigation.push('RecipeDetail', { recipeId: RECIPES[next].id })
    }

    return (
        <ScrollView
            style={styles.screen}
        >
            <Image source={{ uri: recipe.thumb }} style={styles.image} />
            <View style={styles.body} >
                <Text style={styles.title} >{recipe.name}</Text>
                <Text style={styles.meta} >Категория: {recipe.category}</Text>
                <Text style={styles.meta} >Страна: {recipe.area}</Text>
                <Text style={styles.section} >Ингредиенты:</Text>
                <Text style={styles.text} >* Заглушка - настоящие ингредиенты придут с АПИ в Модуле 5</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#fff' },
    image: { width: '100%', height: 240 },
    body: { padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
    meta: { fontSize: 14, color: '#64748b', marginTop: 4 },
    section: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 6, color: '#1e29eb' },
    text: { fontSize: 15, color: '#6478b', marginTop: 40 },
})

export default RecipeDetailsScreen