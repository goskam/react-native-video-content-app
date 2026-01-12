import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PracticeHomeScreen from "./screens/Practice/PracticeHomeScreen";
import SessionTypeScreen from "./screens/Practice/SessionTypeScreen";
import SessionDetailsScreen from "./screens/Practice/SessionDetailsScreen";
import VideoPlayer from "./components/Video/VideoPlayer";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontSize: 20,
          },
          headerTintColor: "#111827",
        }}
      >
        <Stack.Screen
          name="PracticeHome"
          component={PracticeHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SessionTypeScreen"
          component={SessionTypeScreen}
          options={({ route }) => ({
            headerTitle: route.params?.sessionTypeName || "Sessions",
            headerBackTitleVisible: false,
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name="SessionDetailsScreen"
          component={SessionDetailsScreen}
          options={({ route }) => ({
            headerTitle: route.params?.sessionName || "Session",
            headerBackTitleVisible: false,
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayer}
          options={{
            headerTitle: "",
            headerTintColor: "#111827",
            headerTransparent: true,
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}


