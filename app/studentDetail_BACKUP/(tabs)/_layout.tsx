import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function StudentTabsLayout() {
   return (
      <Tabs
         screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#1E40AF",
            tabBarInactiveTintColor: "#9CA3AF",
         }}
      >
         <Tabs.Screen
            name="stat"
            options={{ tabBarLabel: "Stat", tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" color={color} size={size} /> }}
         />
         <Tabs.Screen
            name="skill"
            options={{ tabBarLabel: "Skill", tabBarIcon: ({ color, size }) => <Ionicons name="flash" color={color} size={size} /> }}
         />
         <Tabs.Screen
            name="profile"
            options={{ tabBarLabel: "Profile", tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} /> }}
         />
         <Tabs.Screen
            name="voice"
            options={{ tabBarLabel: "Voice", tabBarIcon: ({ color, size }) => <Ionicons name="mic" color={color} size={size} /> }}
         />
      </Tabs>
   );
}
