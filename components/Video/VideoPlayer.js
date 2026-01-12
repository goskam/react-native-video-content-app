import React, { useState, useRef } from "react";
import { View, StyleSheet, Button, Text, Alert } from "react-native";
import { Video } from "expo-av";
import Slider from "@react-native-community/slider";

export default function VideoPlayer({ route }) {
  const { name, video } = route.params; 
  const videoRef = useRef(null);

  const [status, setStatus] = useState({
    isPlaying: false,
    positionMillis: 0,
    durationMillis: 1, 
  });

  // Toggle play/pause
  const togglePlayPause = async () => {
    if (status.isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
  };

  // Format time mm:ss
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <Video
        ref={videoRef}
        source={{ uri: video }}
        style={styles.video}
        resizeMode="cover"
        useNativeControls={false} 
        onPlaybackStatusUpdate={(status) => setStatus(status)}
        onError={(error) => {
          Alert.alert(
            "Video Playback Error",
            "There was an issue loading the video. Please try again later."
          );
          console.error("Video playback error:", error);
        }}
        shouldPlay={true}
      />

      <View style={styles.controls}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={togglePlayPause}
          color="#111827"
        />

        <Text style={styles.time}>{formatTime(status.positionMillis)}</Text>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={status.durationMillis}
          value={status.positionMillis}
          onSlidingComplete={async (value) => {
            await videoRef.current.setPositionAsync(value);
          }}
          minimumTrackTintColor="#111827"
          maximumTrackTintColor="#8E8E93"
          thumbTintColor="#111827"
        />

        <Text style={styles.time}>{formatTime(status.durationMillis)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    top: 0,
    left: 0,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // optional, for better visibility
    paddingVertical: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  time: {
    color: "white",
    width: 40,
    textAlign: "center",
  },
});
