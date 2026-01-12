import { View, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import SessionCard from './SessionCard';

const SessionsList = ({ data }) => {

      // Function to render each session item in the FlatList
      const renderSessionsList = (itemData) => {
        const item = itemData.item;
        // Define the properties to pass to the SessionCard component
        const itemProps = {
          sessionName: item.name,
          sessionId: item.id,
          image: item.imageUrl,
          duration: item.duration,
          level: item.level,
          instructor: item.instructor,
          description: item.description,
          video: item.videoId
        };
    
        // Render a SessionCard with the provided item properties
        return <SessionCard {...itemProps} />;
      };

    return (
        <View style={styles.container}>
          {/* <Text style={styles.title}>{sessionTypeName}</Text> */}
          <FlatList
            data={data}
            renderItem={renderSessionsList}
            keyExtractor={(session) => session.id}
            showsVerticalScrollIndicator={false} 
          />
        </View>
      );
}

export default SessionsList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    paddingHorizontal: 12, 

    },
    title: {
      fontSize: 40,
    },
  });