import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, View } from "react-native";

import { getStudents } from "api/studentsAPI";

export default function StudentDetail() {
   const { id } = useLocalSearchParams<{ id: string }>();
   const [student, setStudent] = useState<any | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      getStudents()
         .then((data) => {
            const studentsArray = Object.values(data);
            const found = studentsArray.find((s: any) => s.Id.toString() === id);
            setStudent(found || null);
         })
         .finally(() => setLoading(false));
   }, [id]);

   console.log(id);

   if (loading) {
      return (
         <View className="flex-1 items-center justify-center bg-black">
            <ActivityIndicator size="large" color="#fff" />
         </View>
      );
   }

   if (!student) {
      return (
         <View className="flex-1 items-center justify-center bg-black">
            <Text className="text-red-500 text-lg">Student not found {id}</Text>
         </View>
      );
   }

   const studentSpriteURL = `https://schaledb.com/images/student/portrait/${student.Id}.webp`;
   const backgroundURL = `https://schaledb.com/images/background/${student.CollectionBG}.jpg`;

   return (
      <ImageBackground source={{ uri: backgroundURL }} className="flex-1">
         <View className="absolute inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }} />

         <ScrollView contentContainerStyle={{ alignItems: "center", paddingTop: 40, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            {/* sprite */}
            <View className="h-[84vh]">
               <Image source={{ uri: studentSpriteURL }} resizeMode="contain" className="h-full aspect-[1]" />
            </View>

            <Text className="text-white text-2xl font-bold">
               {student?.FamilyName} {student?.PersonalName}
            </Text>
            <Text className="text-white mt-2">ID: {id}</Text>
         </ScrollView>
      </ImageBackground>
   );
}
