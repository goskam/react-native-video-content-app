import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import SessionTypeCard from "../../components/Practice/SessionTypeCard";
import { fetchSessionTypes } from "../../util/http"; // adjust path if needed

const PracticeHomeScreen = () => {
  const [sessionTypes, setSessionTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Defaulting to premium user for showcase
  const isUserPremium = true;

  useEffect(() => {
    const loadSessionTypes = async () => {
      try {
        const types = await fetchSessionTypes();
        setSessionTypes(types);
      } catch (error) {
        console.log("Error fetching session types:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSessionTypes();
  }, []);

  const renderSessionType = (itemData) => {
    const item = itemData.item;
    const isLocked = isUserPremium ? false : item.locked;

    return (
      <SessionTypeCard
        sessionTypeId={item.typeId}
        sessionTypeName={item.name}
        sessionTypeImage={item.image}
        isLocked={isLocked}
      />
    );
  };

  return (
      <View style={styles.container}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>
            Pick the right session for you today
          </Text>
        </View>
        <FlatList
          data={sessionTypes}
          renderItem={renderSessionType}
          keyExtractor={(type) => type.id}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
  );
};

export default PracticeHomeScreen;

const styles = StyleSheet.create({

  container: {
    paddingTop:20,
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitleContainer: {
    paddingTop:50,

    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 16,
  },
});
