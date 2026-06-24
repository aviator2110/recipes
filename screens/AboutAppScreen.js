import { View, StyleSheet, Pressable, Image, Linking } from "react-native";

const AboutAppScreen = () => {
  return (
    <View style={styles.screen}>
      <Pressable
        onPress={() =>
          Linking.openURL("https://github.com/aviator2110/recipes")
        }
      >
        <Image
          style={styles.githubIcon}
          source={require("../assets/icons/github-icon.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 8,
    backgroundColor: "#F4F7FA",
  },
  githubIcon: { width: 150, height: 150 },
});

export default AboutAppScreen;
