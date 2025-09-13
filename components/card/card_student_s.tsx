import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text } from "react-native";

interface SimpleStudentProps {
   id: number;
   name: string;
   school: string;
}

export default function Card({ id, name, school }: SimpleStudentProps) {
   const router = useRouter();
   const studentPotraitURL = `https://schaledb.com/images/student/collection/${id}.webp`;
   const studentSchoolURL = `https://schaledb.com/images/schoolicon/${school}.png`;

   return (
      <Pressable
         className="h-[11rem] rounded p-2 m-0.5 items-center flex-1 bg-gray-800 overflow-hidden"
         onPress={() => router.push(`/studentDetail/${id}`)}
      >
         <Image source={{ uri: studentPotraitURL }} className="rounded-full w-[80px] h-[80px]" />
         <Image source={{ uri: studentSchoolURL }} className="w-10 h-10 mb-1" />
         <Text className="text-white text-sm text-center">{name}</Text>
      </Pressable>
   );
}
