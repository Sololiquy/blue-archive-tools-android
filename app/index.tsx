import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function Index() {
   return (
      <View className="flex-1 allCenter bg-gray-900">
         <View className="flex flex-col gap-4 items-center">
            <Image source={require("../assets/Arona_pyrox.png")} className="rounded-full size-[20rem]" />
            <Pressable onPress={() => router.replace("/(tabs)/student")} className="w-40 bg-blue-600 px-6 py-3 rounded items-center">
               <Text className="text-white text-lg font-semibold">Look Inside</Text>
            </Pressable>
         </View>
      </View>
   );
}
