import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { fetchSessions } from "../../util/http"; 
import SessionsList from "../../components/Practice/SessionsList";

const SessionTypeScreen = ({ navigation }) => {

  const route = useRoute();
  const { sessionTypeId, sessionTypeName } = route.params; //typeId from PracticeScreen

  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const allSessions = await fetchSessions();

        const filtered = allSessions.filter(
          (session) => session.type === sessionTypeId
        );

        setSessions(filtered);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSessions();
  }, [sessionTypeId]);

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#111827" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <SessionsList data={sessions} />
      </View>
    </View>
  );
};

export default SessionTypeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    paddingTop: 100,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
