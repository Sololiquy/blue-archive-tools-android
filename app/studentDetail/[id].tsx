import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, Text, View } from "react-native";

import { getStudents } from "api/studentsAPI";

export default function StudentDetail() {
   const { id } = useLocalSearchParams<{ id: string }>();
   const [student, setStudent] = useState<any | null>(null);
   const [loading, setLoading] = useState(true);

   const [tabIndex, setTabIndex] = useState(1);
   const [tierWeapon, setTierWeapon] = useState(0);
   const [tierStudent, setTierStudent] = useState(1);
   const [level, setLevel] = useState(1);
   const [levelWeapon, setLevelWeapon] = useState(1);
   const [levelEquipment, setLevelEquipment] = useState([1, 1, 1, 0]);
   const [bondRank, setBondRank] = useState(1);
   const [equipments, setEquipments] = useState([null, null, null]);

   useEffect(() => {
      getStudents()
         .then((data) => {
            const found = data.find((s: any) => s.Id.toString() === id);
            setStudent(found || null);
         })
         .finally(() => setLoading(false));
   }, [id]);

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
            <Text className="text-red-500 text-lg">Student not found</Text>
         </View>
      );
   }

   const studentSpriteURL = `https://schaledb.com/images/student/portrait/${student.Id}.webp`;
   const backgroundURL = `https://schaledb.com/images/background/${student.CollectionBG}.jpg`;

   return (
      <ImageBackground source={{ uri: backgroundURL }} className="flex-1 items-center">
         <View
            className="absolute inset-0"
            style={{
               backgroundColor: "rgba(0, 0, 0, 0.75)",
            }}
         />
         <Image source={{ uri: studentSpriteURL }} resizeMode="contain" className=" w-screen h-[84vh]" />
         <Text className="text-white text-2xl font-bold">
            {student?.FamilyName} {student?.PersonalName}
         </Text>
         <Text className="text-white mt-2">ID: {id}</Text>
      </ImageBackground>
   );
}
