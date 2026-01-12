import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Define the SessionTypeCard component, which takes sessionTypeId and sessionTypeName as props
const SessionTypeCard = ({
  sessionTypeId,
  sessionTypeName,
  sessionTypeImage,
  isLocked,
}) => {
  const navigation = useNavigation();

  const redirectToSessionsScreen = () => {
    navigation.navigate("SessionTypeScreen", {
      sessionTypeId: sessionTypeId,
      sessionTypeName: sessionTypeName,
    });
  };

  return (
    <View style={styles.cardContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed, 
        ]}
        onPress={redirectToSessionsScreen}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: sessionTypeImage }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoContainer}>
          <Ionicons
            name={isLocked ? "lock-closed" : "lock-open-outline"}
            size={16}
            color="black"
          />
          <Text style={styles.title}>{sessionTypeName}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SessionTypeCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden", 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",

    elevation: 2,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardPressed: {
    opacity: 0.8,
  },

  imageWrapper: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9fafb",
  },

  title: {
    fontSize: 16,
    marginLeft: 8,
    color: "#111827",
    fontWeight: "600",
  },
});
