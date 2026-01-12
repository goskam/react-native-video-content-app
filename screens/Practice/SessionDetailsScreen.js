import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import WatchButton from "../../components/ui/WatchButton";
import { videoBaseUrl } from "../../secrets";

const SessionDetailsScreen = ({ navigation }) => {
  const route = useRoute();

  const {
    sessionName,
    sessionId,
    image,
    duration,
    level,
    instructor,
    description,
    video,
  } = route.params;

  const [cachedUri, setCachedUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [preloadError, setPreloadError] = useState(false);

  const videoURL =
    videoBaseUrl + video + ".mp4";
  const localUri = `${FileSystem.cacheDirectory}${sessionId || "video"}.mp4`;

  // Check cache on mount
  useEffect(() => {
    const checkCache = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(localUri);
        if (fileInfo.exists) {
          setCachedUri(fileInfo.uri);
        }
      } catch (e) {
        console.log("Error checking cache", e);
      }
    };
    checkCache();
  }, []);

  // Preload video function
  const preloadVideo = async () => {
    if (loading || cachedUri) return;

    setLoading(true);
    setPreloadError(false);
    setDownloadProgress(0);

    try {
      const fileInfo = await FileSystem.getInfoAsync(localUri);
      if (!fileInfo.exists) {
        const downloadResumable = FileSystem.createDownloadResumable(
          videoURL,
          localUri,
          {},
          (progress) => {
            const ratio =
              progress.totalBytesWritten / progress.totalBytesExpectedToWrite;
            if (!isNaN(ratio)) {
              setDownloadProgress(ratio);
            }
          }
        );

        const result = await downloadResumable.downloadAsync();

        if (!result || result.status !== 200) {
          throw new Error("Download failed or was interrupted");
        }

        const fileInfoAfter = await FileSystem.getInfoAsync(localUri);

        if (!fileInfoAfter.exists || fileInfoAfter.size < 1000) {
          Alert.alert(
            "Error",
            "File downloaded but appears to be invalid or incomplete."
          );
          throw new Error("Invalid file downloaded");
        }
      }

      setCachedUri(localUri);
    } catch (error) {
      console.warn("Preload error:", error);
      setPreloadError(true);
      Alert.alert(
        "Preload Failed",
        error.message || "An unknown error occurred."
      );
    } finally {
      setLoading(false);
      setDownloadProgress(0);
    }
  };

  // Handler when button pressed
  const handlePress = () => {
    if (cachedUri) {
      // Video preloaded, navigate to player
      navigation.navigate("VideoPlayer", {
        name: sessionName,
        video: cachedUri,
      });
    } else {
      // Not preloaded, start preload
      preloadVideo();
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={styles.details}>
          <Text style={styles.detailsText}>{duration} minutes</Text>
          <Text style={styles.detailsText}>{level}</Text>
          <Text style={styles.detailsText}>{instructor}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <WatchButton
            text={cachedUri ? "Watch Now" : "Preload Video"}
            onPress={handlePress}
            loading={loading}
            progress={downloadProgress}
          />
        </View>
      </View>
    </View>
  );
};

export default SessionDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    paddingTop: 100,
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#f3f4f6",
  },
  details: {
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-around",
  },
  detailsText: {
    color: "#111827",
    fontWeight: "500",
  },
  descriptionContainer: {
    margin: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  descriptionText: {
    color: "#374151",
    lineHeight: 20,
  },
});
