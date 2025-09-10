import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { contextStudentDetail } from "app/studentDetail/useContextWrapper";

interface parameterType {
   typeStat: string;
   nameStat: string;
   Level: number;
   levelWeapon: number;
   equipment: any;
}

export default function Stat({ typeStat, nameStat, Level, levelWeapon }: parameterType) {
   const { student, equipment, levelEquipment, bondRank } = useContext(contextStudentDetail);

   // STUDENT VALUE CALCULATION
   let value = 0;
   if (student) {
      if (typeStat === "MaxHP") {
         value = Math.round(student?.MaxHP1 + ((student?.MaxHP100 - student?.MaxHP1) / 99) * (Level - 1));
      } else if (typeStat === "AttackPower") {
         value = Math.round(student.AttackPower1 + ((student.AttackPower100 - student.AttackPower1) / 99) * (Level - 1));
      } else if (typeStat === "DefensePower") {
         value = Math.round(student.DefensePower1 + ((student.DefensePower100 - student.DefensePower1) / 99) * (Level - 1));
      } else if (typeStat === "HealPower") {
         value = Math.round(student.HealPower1 + ((student.HealPower100 - student.HealPower1) / 99) * (Level - 1));
      } else {
         value = Number(student[typeStat as keyof typeof student]);
      }
   }

   // WEAPONS VALUE CALCULATION
   let weaponValue = 0;
   if (student) {
      if (typeStat === "MaxHP") {
         weaponValue = Math.round(student.Weapon.MaxHP1 + ((student.Weapon.MaxHP100 - student.Weapon.MaxHP1) / 49) * (levelWeapon - 1));
      } else if (typeStat === "AttackPower") {
         weaponValue = Math.round(
            student.Weapon.AttackPower1 + ((student.Weapon.AttackPower100 - student.Weapon.AttackPower1) / 49) * (levelWeapon - 1)
         );
      } else if (typeStat === "HealPower") {
         weaponValue = Math.round(student.Weapon.HealPower1 + ((student.Weapon.HealPower100 - student.Weapon.HealPower1) / 49) * (levelWeapon - 1));
      } else {
         weaponValue = 0;
      }
   }

   // EQUIPMENT VALUE CALCULATION
   let equipmentTotalValue = 0;

   for (let a = 0; a < 3; a++) {
      if (equipment && equipment[a]) {
         const equip = equipment[a] as { StatType: string[]; StatValue: number[][] } | null;

         if (equip) {
            for (let b = 0; b < equip.StatType.length; b++) {
               const statInfo = equip.StatType[b]?.split("_") || [];
               const stat = statInfo[0];
               const calculation = statInfo[1];

               if (typeStat === stat) {
                  const equipmentValue = equip.StatValue[b]?.[0] || 0;
                  let equipmentTrueValue = 0;

                  if (calculation === "Coefficient") {
                     equipmentTrueValue = (equipmentValue / 10000) * value;
                  } else if (calculation === "Base") {
                     equipmentTrueValue = equipmentValue;
                  }

                  equipmentTotalValue += equipmentTrueValue;
               }
            }
         }
      }
   }

   if (student?.Gear?.Released && levelEquipment?.[3] >= 1) {
      for (let a = 0; a < (student?.Gear?.StatType?.length ?? 0); a++) {
         const statInfo = student?.Gear?.StatType?.[a]?.split("_") || [];
         const stat = statInfo[0];
         const calculation = statInfo[1];

         if (typeStat === stat) {
            const equipmentValue = student?.Gear?.StatValue?.[a]?.[0] ?? 0;
            let equipmentTrueValue = 0;

            if (calculation === "Coefficient") {
               equipmentTrueValue = (equipmentValue / 10000) * value;
            } else if (calculation === "Base") {
               equipmentTrueValue = equipmentValue;
            }

            equipmentTotalValue += equipmentTrueValue;
         }
      }
   }

   // BOND VALUE CALCULATION
   if (student?.FavorStatType) {
      for (let a = 0; a < student?.FavorStatType.length; a++) {
         if (typeStat === student?.FavorStatType[a]) {
            let equipmentTrueValue = 0;
            if (bondRank >= 1 && bondRank <= 5) {
               equipmentTrueValue += (bondRank - 1) * student?.FavorStatValue[0][a];
            } else if (bondRank >= 11 && bondRank <= 15) {
               equipmentTrueValue += 4 * student?.FavorStatValue[0][a];
               equipmentTrueValue += 5 * student?.FavorStatValue[1][a];
               equipmentTrueValue += (bondRank - 10) * student?.FavorStatValue[2][a];
            } else if (bondRank >= 16 && bondRank <= 20) {
               equipmentTrueValue += 4 * student?.FavorStatValue[0][a];
               equipmentTrueValue += 5 * student?.FavorStatValue[1][a];
               equipmentTrueValue += 5 * student?.FavorStatValue[2][a];
               equipmentTrueValue += (bondRank - 15) * student?.FavorStatValue[3][a];
            } else if (bondRank >= 21 && bondRank <= 30) {
               equipmentTrueValue += 4 * student?.FavorStatValue[0][a];
               equipmentTrueValue += 5 * student?.FavorStatValue[1][a];
               equipmentTrueValue += 5 * student?.FavorStatValue[2][a];
               equipmentTrueValue += 5 * student?.FavorStatValue[3][a];
               equipmentTrueValue += (bondRank - 20) * student?.FavorStatValue[4][a];
            } else if (bondRank >= 31 && bondRank <= 40) {
               equipmentTrueValue += 4 * student?.FavorStatValue[0][a];
               equipmentTrueValue += 5 * student?.FavorStatValue[1][a];
               equipmentTrueValue += 5 * student?.FavorStatValue[2][a];
               equipmentTrueValue += 5 * student?.FavorStatValue[3][a];
               equipmentTrueValue += 10 * student?.FavorStatValue[4][a];
               equipmentTrueValue += (bondRank - 30) * student?.FavorStatValue[5][a];
            } else if (bondRank >= 41 && bondRank <= 50) {
               equipmentTrueValue += 4 * student?.FavorStatValue[0][a];
               equipmentTrueValue += 5 * student?.FavorStatValue[1][a];
               equipmentTrueValue += 5 * student?.FavorStatValue[2][a];
               equipmentTrueValue += 5 * student?.FavorStatValue[3][a];
               equipmentTrueValue += 10 * student?.FavorStatValue[4][a];
               equipmentTrueValue += 10 * student?.FavorStatValue[5][a];
               equipmentTrueValue += (bondRank - 40) * student?.FavorStatValue[6][a];
            }
            equipmentTotalValue += equipmentTrueValue;
         }
      }
   }

   // Tier Student Stat up?
   const equipmentBonus = Math.round((equipmentTotalValue + Number.EPSILON) * 10) / 10;

   const statIconURL = `https://schaledb.com/images/staticon/Stat_${typeStat}.png`;

   return (
      <View className={`w-full flex flex-row items-center`}>
         <Image className={`size-12`} src={statIconURL} alt="" />
         <Text className={`flex-grow overflow-hidden whitespace-nowrap text-ellipsis text-white`}>{nameStat}</Text>
         <Text className={`ml-5 mr-2 flex-shrink-0 text-white`}>{Math.round(value + equipmentBonus + weaponValue)}</Text>
         {/* <Text className={`ml-5 mr-2 flex-shrink-0`}>{Math.round(value + weaponValue + equipmentTotalValue)}</Text> */}
      </View>
   );
}

const styles = StyleSheet.create({});
