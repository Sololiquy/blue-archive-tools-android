import React, { useContext } from "react";
import { Image, StyleSheet, View } from "react-native";

import { contextStudentDetail } from "app/studentDetail/useContextWrapper";

interface parameterType {
   terrainType: string;
   terrainValue: number;
}

export default function Terrain({ terrainType, terrainValue }: parameterType) {
   const { student, tierWeapon } = useContext(contextStudentDetail);
   const terrainImg = `https://schaledb.com/images/ui/Terrain_${terrainType}.png`;

   let trueTerrainValue = terrainValue;
   if (tierWeapon >= 3) {
      if (terrainType === student?.Weapon?.AdaptationType) {
         trueTerrainValue = student?.Weapon?.AdaptationValue + terrainValue;
      } else {
         trueTerrainValue = terrainValue;
      }
   }

   const Mood = `https://schaledb.com/images/ui/Adaptresult${trueTerrainValue}.png`;

   return (
      <>
         <View className={`px-1 h-12 flex flex-row items-center bg-[rgba(0,0,0,0.3)]`}>
            <Image className={`size-12`} resizeMode="contain" src={terrainImg} alt="" />
            <Image className={`size-10`} resizeMode="contain" src={Mood} alt="" />
         </View>
      </>
   );
}

const styles = StyleSheet.create({});
