import Slider from "@react-native-community/slider";
import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Star from "assets/star.svg";

import { contextStudentDetail } from "app/studentDetail/useContextWrapper";

interface parameterType {
   handleTierWeaponChange: (index: number) => void;
   handleBondLevelChange: (value: number) => void;
}

export default function Stat({ handleTierWeaponChange, handleBondLevelChange }: parameterType) {
   const { student, tierWeapon, levelWeapon, setLevelWeapon } = useContext(contextStudentDetail);

   // Color for squadtype of student
   const squadType = {
      Main: ["strikerRoleColor", "STRIKER"],
      Support: ["specialRoleColor", "SUPPORT"],
   }[student?.SquadType as "Main" | "Support"];

   // Function
   const handleLevelWeaponChange = (value: number) => {
      setLevelWeapon(value);
   };

   // Image URL
   const studentWeaponURL = `https://schaledb.com/images/weapon/${student?.WeaponImg}.webp`;
   const roleStudentURL = `https://schaledb.com/images/ui/Role_${student?.TacticRole}.png`;
   const attackTypeURL = "https://schaledb.com/images/ui/Type_Attack.png";
   const defenseTypeURL = "https://schaledb.com/images/ui/Type_Defense.png";
   const studentPotraitURL = `https://schaledb.com/images/student/collection/${student.Id}.webp`;

   return (
      <View className="gap-1 ">
         <View>
            <Text className="px-2 font-bold text-2xl italic text-white">{student?.Name}</Text>
            <View className="flex flex-row items-center">
               <View className="shrink-0 h-7 px-3 ml-1 rounded-full flex flex-row allCenter bg-[rgba(0,0,0,0.675)]">
                  {Array.from({ length: student?.StarGrade }, (_, i) => (
                     <Star key={i} width={20} height={20} style={{ marginHorizontal: 2 }} />
                  ))}
               </View>
               <Text className={`w-[6.25rem] h-6 ml-1 rounded-full allTextCenter font-bold italic text-white ${squadType[0]}`}>{squadType[1]}</Text>
            </View>
         </View>
         <View className="">
            <Image source={{ uri: studentWeaponURL }} resizeMode="contain" className="w-full h-[150px] flex flex-col justify-center" />
            <View className="h-7 px-2 gap-1 flex flex-row items-center">
               <Pressable
                  className={`w-10 h-5 shrink-0 rounded-full flex allCenter bg-[rgba(0,0,0,0.3)] ${tierWeapon >= 1 ? "font-bold !text-black !bg-white" : ""}`}
                  onPress={() => handleTierWeaponChange(1)}
               >
                  <Text>UE1</Text>
               </Pressable>
               <Pressable
                  className={`w-10 h-5 shrink-0 rounded-full flex allCenter bg-[rgba(0,0,0,0.3)] ${tierWeapon >= 2 ? "font-bold !text-black !bg-white" : ""}`}
                  onPress={() => handleTierWeaponChange(2)}
               >
                  <Text>UE2</Text>
               </Pressable>
               <Pressable
                  className={`w-10 h-5 shrink-0 rounded-full flex allCenter bg-[rgba(0,0,0,0.3)] ${tierWeapon >= 3 ? "font-bold !text-black !bg-white" : ""}`}
                  onPress={() => handleTierWeaponChange(3)}
               >
                  <Text>UE3</Text>
               </Pressable>
               <View className="flex-1 flex-row items-center gap-2">
                  <Slider
                     style={{ flex: 1 }}
                     minimumValue={1}
                     maximumValue={50}
                     step={1}
                     value={levelWeapon}
                     onValueChange={handleLevelWeaponChange}
                     minimumTrackTintColor="#FFFFFF"
                     maximumTrackTintColor="#FFFFFF"
                     thumbTintColor="#FFFFFF"
                  />
               </View>
               <Text className="w-10 font-bold italic tracking-wide text-white">Lv.{levelWeapon}</Text>
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({});
