import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function SkillTab() {
   const { id } = useLocalSearchParams<{ id: string }>();

   return (
      <View className="flex-1 items-center justify-center bg-black">
         <Text className="text-white text-lg">Skill Tab for student ID: {id}</Text>
      </View>
   );
}
