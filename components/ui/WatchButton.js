import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const WatchButton = ({ onPress, text, loading, progress }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      >
        <View style={styles.content}>
          {!loading && (
            <Ionicons name="play" size={24} color="white" />
          )}
          <Text style={styles.text}>
            {loading ? `Preloading ${Math.round(progress * 100)}%` : text}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default WatchButton;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    backgroundColor: "#111827",
    borderRadius: 15,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.75,
  },
});
