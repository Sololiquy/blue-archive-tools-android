import { Ionicons } from "@expo/vector-icons";
import CustomTabBar from "components/bottomNavbar";
import { Tabs } from "expo-router";

export default function TabsLayout() {
   return (
      <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
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
