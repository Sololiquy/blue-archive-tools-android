import React, { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Arror from "assets/arrow.svg"; // works if you set up react-native-svg-transformer

import { contextStudentDetail } from "app/studentDetail/useContextWrapper";

interface parameterType {
   typeEquipment: number;
   levelEquipment: number;
   setLevelEquipment: (value: number) => void;
}

export default function Equipment({ typeEquipment, levelEquipment, setLevelEquipment }: parameterType) {
   const { student } = useContext(contextStudentDetail);
   const [equipmentImgSrc, setEquipmentImgSrc] = useState<string>("");
   const maxLevel = typeEquipment === 3 ? 2 : 10;

   useEffect(() => {
      if (levelEquipment > 0) {
         if (typeEquipment !== 3) {
            setEquipmentImgSrc(
               `https://schaledb.com/images/equipment/full/equipment_icon_${student.Equipment[typeEquipment].toLowerCase()}_tier${levelEquipment}.webp`
            );
         } else {
            setEquipmentImgSrc(`https://schaledb.com/images/gear/icon/${student?.Id}.webp`);
         }
      } else {
         setEquipmentImgSrc(`https://schaledb.com/images/gear/empty.png`);
      }
   }, [levelEquipment]);

   const handleEquipmentLevelDecrease = () => {
      setLevelEquipment(levelEquipment - 1);
   };
   const handleEquipmentLevelIncrease = () => {
      setLevelEquipment(levelEquipment + 1);
   };

   return (
      <View className="m-1.5 grow-0 flex flex-col items-center">
         <View className="flex size-16 rounded-full items-center justify-center bg-[rgb(140,147,158)] overflow-hidden">
            <Image
               source={{ uri: equipmentImgSrc }}
               style={styles.image}
               resizeMode="contain"
               onError={() => Image.prefetch("https://schaledb.com/images/gear/empty.png")}
            />
         </View>
         <View className="h-8 flex flex-row items-center justify-center mt-1">
            <Pressable
               className="size-3 items-center justify-center rotate-180"
               onPress={levelEquipment > 0 ? handleEquipmentLevelDecrease : undefined}
            >
               <Arror width={12} height={12} />
            </Pressable>
            <Text className="font-bold mx-2 text-white">T{levelEquipment}</Text>
            <Pressable className="size-3 items-center justify-center" onPress={levelEquipment < maxLevel ? handleEquipmentLevelIncrease : undefined}>
               <Arror width={12} height={12} />
            </Pressable>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   image: {
      width: "100%",
      height: "100%",
   },
});
