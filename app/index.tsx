import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

import { getEnemies } from "api/enemiesAPI";
import { getEquipments } from "api/equipmentsAPI";
import { getLocalizations } from "api/localizationsAPI";
import { getStudents } from "api/studentsAPI";
import { getVoices } from "api/voicesAPI";

export default function Index() {
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      Promise.all([getStudents(), getEquipments(), getVoices(), getEnemies(), getLocalizations()])
         .then(() => {
            console.log("✅ All API data cached");
         })
         .finally(() => setLoading(false));
   }, []);

   if (loading) {
      return (
         <View className="flex-1 allCenter bg-gray-900">
            <ActivityIndicator size="large" color="#60A5FA" />
            <Text className="text-white mt-4">Loading game data...</Text>
         </View>
      );
   }

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
