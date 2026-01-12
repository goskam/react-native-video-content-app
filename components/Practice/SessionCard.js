import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SessionCard = ({
  sessionName,
  sessionId,
  image,
  duration,
  level,
  instructor,
  description,
  video,
}) => {
  const navigation = useNavigation();

  const openSessionDetails = () => {
    navigation.navigate("SessionDetailsScreen", {
      sessionName,
      sessionId,
      image,
      duration,
      level,
      instructor,
      description,
      video,
    });
  };

  return (
    <View style={styles.cardContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={openSessionDetails}
      >
        <View style={styles.innerContainer}>
          <Image source={{ uri: image }} style={styles.imageContainer} />

          <View style={styles.textContainer}>
            <Text style={styles.title}>{sessionName}</Text>
            <Text style={styles.subtitle}>{`Duration: ${duration} mins`}</Text>
            {level && <Text style={styles.level}>Level: {level}</Text>}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default SessionCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: 210,
    width: '100%',
    backgroundColor: "#f9f9f9", 
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 1, 
    borderColor: "#e0e0e0",
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, 
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
  },
  button: {
    flex: 1,
    borderRadius: 15,
  },
  buttonPressed: {
    opacity: 0.95,
  },
  innerContainer: {
    flex: 1,
  },
  imageContainer: {
    height: 130,
    width: "100%",
    resizeMode: "cover",
    backgroundColor: "#e9e9e9",
    opacity: 0.90
  },
  textContainer: {
    padding: 15,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    color: "#2c3e50",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    // marginBottom: 4,
  },
  level: {
    fontSize: 12,
    color: "#95a5a6",
    paddingBottom: 10

  },
});

