// components/CustomTabBar.tsx
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
   return (
      <View className={`absolute left-24 right-24 bottom-14 flex-row items-center justify-center p-3 bg-white rounded-full `}>
         {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
               const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
               });

               if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
               }
            };

            return (
               <TouchableOpacity key={route.key} onPress={onPress} style={{ alignItems: "center", flex: 1 }}>
                  <Ionicons
                     name={
                        options.tabBarIcon
                           ? (options.tabBarIcon as any)({ focused: isFocused, color: isFocused ? "#1E40AF" : "#9CA3AF", size: 24 }).props.name
                           : "ellipse"
                     }
                     color={isFocused ? "#1E40AF" : "#9CA3AF"}
                     size={24}
                  />
                  <Text style={{ color: isFocused ? "#1E40AF" : "#9CA3AF", fontSize: 12 }}>{label as string}</Text>
               </TouchableOpacity>
            );
         })}
      </View>
   );
}
