import Slider from "@react-native-community/slider";
import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import Equipment from "components/studentDetail/stat/components/equipment";
import Stat from "components/studentDetail/stat/components/stat";
import Terrain from "components/studentDetail/stat/components/terrain";

import StarBlue from "assets/star-blue.svg";
import StarEmpty from "assets/star-empty.svg";
import StarGold from "assets/star-gold.svg";
import Star from "assets/star.svg";

import { contextStudentDetail } from "app/studentDetail/useContextWrapper";

interface parameterType {
   handleTierWeaponChange: (index: number) => void;
   handleBondLevelChange: (value: number) => void;
}

export default function StatDescription({ handleTierWeaponChange, handleBondLevelChange }: parameterType) {
   const {
      student,
      tierStudent,
      setTierStudent,
      level,
      setLevel,
      bondRank,
      equipment,
      tierWeapon,
      levelWeapon,
      setLevelWeapon,
      levelEquipment,
      setLevelEquipment,
   } = useContext(contextStudentDetail);

   // Coloring
   const attackType = {
      Explosion: "explosiveAttackColor",
      Pierce: "piercingAttackColor",
      Mystic: "mysticAttackColor",
      Sonic: "sonicAttackColor",
   }[student?.BulletType as "Explosion" | "Pierce" | "Mystic" | "Sonic"];

   const defenseType = {
      LightArmor: "lightArmorColor",
      HeavyArmor: "heavyArmorColor",
      Unarmed: "specialArmorColor",
      ElasticArmor: "elasticArmorColor",
   }[student?.ArmorType as "LightArmor" | "HeavyArmor" | "Unarmed" | "ElasticArmor"];

   const squadType = {
      Main: ["strikerRoleColor", "STRIKER"],
      Support: ["specialRoleColor", "SUPPORT"],
   }[student?.SquadType as "Main" | "Support"];

   // Image URL
   const studentWeaponURL = `https://schaledb.com/images/weapon/${student?.WeaponImg}.webp`;
   const roleStudentURL = `https://schaledb.com/images/ui/Role_${student?.TacticRole}.png`;
   const attackTypeURL = "https://schaledb.com/images/ui/Type_Attack.png";
   const defenseTypeURL = "https://schaledb.com/images/ui/Type_Defense.png";
   const studentPotraitURL = `https://schaledb.com/images/student/collection/${student.Id}.webp`;

   return (
      <View className={`gap-1`}>
         <View>
            <Text className={`px-2 font-bold text-2xl italic text-white`}>{student?.Name}</Text>
            <View className={`flex flex-row items-center`}>
               <View className={`shrink-0 h-7 px-3 ml-1 rounded-full flex flex-row allCenter bg-[rgba(0,0,0,0.675)]`}>
                  {Array.from({ length: student?.StarGrade }, (_, i) => (
                     <Star key={i} width={20} height={20} style={{ marginHorizontal: 2 }} />
                  ))}
               </View>
               <Text className={`w-[6.25rem] h-6 ml-1 rounded-full allTextCenter font-bold italic text-white ${squadType[0]}`}>{squadType[1]}</Text>
            </View>
         </View>

         <View className={`bg-[rgba(0,0,0,0.3)]`}>
            <Image source={{ uri: studentWeaponURL }} resizeMode="contain" className={`w-full h-[150px] flex flex-col justify-center`} />
            <View className={`h-7 px-2 gap-1 flex flex-row items-center`}>
               <Pressable
                  className={`w-10 h-5 shrink-0 rounded-full flex allCenter bg-[rgba(0,0,0,0.3)] ${tierWeapon >= 1 ? "!bg-white" : ""}`}
                  onPress={() => handleTierWeaponChange(1)}
               >
                  <Text className={`text-gray-600 ${tierWeapon >= 1 ? "font-bold !text-black" : ""}`}>UE1</Text>
               </Pressable>
               <Pressable
                  className={`w-10 h-5 shrink-0 rounded-full flex allCenter bg-[rgba(0,0,0,0.3)] ${tierWeapon >= 2 ? "font-bold !text-black !bg-white" : ""}`}
                  onPress={() => handleTierWeaponChange(2)}
               >
                  <Text className={`text-gray-600 ${tierWeapon >= 2 ? "font-bold !text-black" : ""}`}>UE2</Text>
               </Pressable>
               <Pressable
                  className={`w-10 h-5 shrink-0 rounded-full flex allCenter bg-[rgba(0,0,0,0.3)] ${tierWeapon >= 3 ? "font-bold !text-black !bg-white" : ""}`}
                  onPress={() => handleTierWeaponChange(3)}
               >
                  <Text className={`text-gray-600 ${tierWeapon >= 3 ? "font-bold !text-black" : ""}`}>UE3</Text>
               </Pressable>
               <View className={`flex-1 flex-row items-center gap-2`}>
                  <Slider
                     style={{ flex: 1 }}
                     minimumValue={1}
                     maximumValue={50}
                     step={1}
                     value={levelWeapon}
                     onValueChange={setLevelWeapon}
                     minimumTrackTintColor="#FFFFFF"
                     maximumTrackTintColor="#FFFFFF"
                     thumbTintColor="#FFFFFF"
                  />
               </View>
               <Text className={`w-10 font-bold italic tracking-wide text-white`}>Lv.{levelWeapon}</Text>
            </View>
         </View>

         <View className={`w-full gap-1 py-1 flex flex-row flex-wrap justify-center bg-[rgba(0,0,0,0.3)]`}>
            <View className={`shrink-0 w-12 h-12 rounded-full flex allCenter bg-[rgba(0,0,0,0.3)]`}>
               <Image className={`size-12`} src={roleStudentURL} alt="" />
            </View>
            <View className={`shrink-0 w-12 h-12 rounded-full flex allCenter bg-[rgba(0,0,0,0.3)] ${attackType}`}>
               <Image className={`size-4/6`} resizeMode="contain" src={attackTypeURL} alt="" />
            </View>
            <View className={`shrink-0 w-12 h-12 rounded-full flex allCenter bg-[rgba(0,0,0,0.3)] ${defenseType}`}>
               <Image className={`size-4/6`} resizeMode="contain" src={defenseTypeURL} alt="" />
            </View>
            <View className={`flex flex-row gap-1`}>
               <Terrain terrainType="Street" terrainValue={Number(student?.StreetBattleAdaptation) ?? 0} />
               <Terrain terrainType="Outdoor" terrainValue={Number(student?.OutdoorBattleAdaptation) ?? 0} />
               <Terrain terrainType="Indoor" terrainValue={Number(student?.IndoorBattleAdaptation) ?? 0} />
            </View>
         </View>

         <View className={`w-full px-1 flex-row flex-wrap bg-[rgba(0,0,0,0.3)]`}>
            <View className={`w-1/2`}>
               <Stat typeStat="MaxHP" nameStat="Max HP" equipment={equipment} Level={level} levelWeapon={levelWeapon} />
            </View>
            <View className={`w-1/2`}>
               <Stat typeStat="AttackPower" nameStat="Attack" equipment={equipment} Level={level} levelWeapon={levelWeapon} />
            </View>
            <View className={`w-1/2`}>
               <Stat typeStat="DefensePower" nameStat="Defense" equipment={equipment} Level={level} levelWeapon={levelWeapon} />
            </View>
            <View className={`w-1/2`}>
               <Stat typeStat="DodgePoint" nameStat="Evasion" equipment={equipment} Level={level} levelWeapon={levelWeapon} />
            </View>
            <View className={`w-1/2`}>
               <Stat typeStat="CriticalPoint" nameStat="Crit Rate" equipment={equipment} Level={level} levelWeapon={levelWeapon} />
            </View>
            <View className={`w-1/2`}>
               <Stat typeStat="CriticalDamageRate" nameStat="Crit Dmg" equipment={equipment} Level={level} levelWeapon={levelWeapon} />
            </View>
            <View className={`w-1/2`}>
               <Stat typeStat="HealPower" nameStat="Healing" equipment={equipment} Level={level} levelWeapon={levelWeapon} />
            </View>
            <View className={`w-1/2`}>
               <Stat typeStat="Range" nameStat="Attack Range" equipment={equipment} Level={level} levelWeapon={levelWeapon} />
            </View>
         </View>

         <View className={`w-full px-1 overflow-hidden flex flex-row justify-center bg-[rgba(0,0,0,0.3)]`}>
            <Equipment
               typeEquipment={0}
               levelEquipment={levelEquipment[0]}
               setLevelEquipment={(value: number) => {
                  const updated = [...levelEquipment];
                  updated[0] = value;
                  setLevelEquipment(updated);
               }}
            />
            <Equipment
               typeEquipment={1}
               levelEquipment={levelEquipment[1]}
               setLevelEquipment={(value: number) => {
                  const updated = [...levelEquipment];
                  updated[1] = value;
                  setLevelEquipment(updated);
               }}
            />
            <Equipment
               typeEquipment={2}
               levelEquipment={levelEquipment[2]}
               setLevelEquipment={(value: number) => {
                  const updated = [...levelEquipment];
                  updated[2] = value;
                  setLevelEquipment(updated);
               }}
            />
            <View className={`p-1 flex allCenter`}>
               <View className={`h-24 border-l border-white`}></View>
            </View>
            <Equipment
               typeEquipment={3}
               levelEquipment={levelEquipment[3]}
               setLevelEquipment={(value: number) => {
                  const updated = [...levelEquipment];
                  updated[3] = value;
                  setLevelEquipment(updated);
               }}
            />
         </View>

         <View className={`flex flex-row px-1`}>
            <View className={`flex-1 flex-row items-center gap-2`}>
               <Slider
                  style={{ flex: 1 }}
                  minimumValue={1}
                  maximumValue={100}
                  step={1}
                  value={level}
                  onValueChange={setLevel}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#FFFFFF"
                  thumbTintColor="#FFFFFF"
               />
            </View>
            <Text className={`w-12 font-bold italic tracking-wide text-white`}>Lv.{level}</Text>
         </View>

         <View className={`flex flex-row px-2 gap-1`}>
            <View className="h-10 self-start rounded-full flex flex-row allCenter bg-[rgba(0,0,0,0.4)]">
               <Image source={{ uri: studentPotraitURL }} className="w-10 h-10 rounded-full mr-2" />
               <TextInput
                  className="w-10 text-white text-base"
                  value={bondRank.toString()}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                     const num = parseInt(text) || 1;
                     if (num >= 1 && num <= 100) {
                        handleBondLevelChange(num);
                     }
                  }}
               />
            </View>
            <View className={`px-2 flex flex-row rounded-full allCenter bg-[rgba(0,0,0,0.4)]`}>
               {[1, 2, 3, 4, 5].map((tier) => (
                  <Pressable key={tier} onPress={() => setTierStudent(tier)}>
                     {tierStudent >= tier ? (
                        <StarGold width={20} height={20} style={{ marginHorizontal: 2 }} />
                     ) : (
                        <StarEmpty width={20} height={20} style={{ marginHorizontal: 2 }} />
                     )}
                  </Pressable>
               ))}
               <View className={`mx-1`}></View>
               {[6, 7, 8].map((tier) => (
                  <Pressable key={tier} onPress={() => setTierStudent(tier)}>
                     {tierStudent >= tier ? (
                        <StarBlue width={20} height={20} style={{ marginHorizontal: 2 }} />
                     ) : (
                        <StarEmpty width={20} height={20} style={{ marginHorizontal: 2 }} />
                     )}
                  </Pressable>
               ))}
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({});
