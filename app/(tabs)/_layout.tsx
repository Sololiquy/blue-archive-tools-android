import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
   return (
      <Tabs
         screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#1E40AF",
            tabBarInactiveTintColor: "#9CA3AF",
         }}
      >
         <Tabs.Screen
            name="student"
            options={{
               title: "Student",
               tabBarLabel: "Student",
               tabBarIcon: ({ color, size }) => <Ionicons name="people-sharp" color={color} size={size} />,
            }}
         />
         <Tabs.Screen
            name="enemy"
            options={{
               title: "Enemy",
               tabBarLabel: "Enemy",
               tabBarIcon: ({ color, size }) => <Ionicons name="skull" color={color} size={size} />,
            }}
         />
      </Tabs>
   );
}
