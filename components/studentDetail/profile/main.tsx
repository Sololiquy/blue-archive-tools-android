import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Star from "assets/star.svg";

import { contextStudentDetail } from "app/studentDetail/useContextWrapper";

export default function Profile() {
   const { student, localization } = useContext(contextStudentDetail);

   const school = localization?.SchoolLong[student?.School as keyof typeof localization.SchoolLong];
   const club = localization?.Club[student?.Club as keyof typeof localization.Club];

   const studentWeaponURL = `https://schaledb.com/images/weapon/${student?.WeaponImg}.webp`;
   const studentSchoolURL = `https://schaledb.com/images/schoolicon/${student?.School}.png`;

   return (
      <View className={`gap-1`}>
         <View>
            <Text className={`px-2 font-bold text-2xl italic text-white`}>
               {student?.FamilyName} {student?.PersonalName}
            </Text>
            <View className={`flex flex-row items-center`}>
               <View className={`shrink-0 h-7 px-3 ml-1 rounded-full flex flex-row allCenter bg-[rgba(0,0,0,0.675)]`}>
                  {Array.from({ length: student?.StarGrade }, (_, i) => (
                     <Star key={i} width={20} height={20} style={{ marginHorizontal: 2 }} />
                  ))}
               </View>
            </View>
         </View>

         <View className={`bg-[rgba(0,0,0,0.3)]`}>
            <Image source={{ uri: studentWeaponURL }} resizeMode="contain" className={`w-full h-[150px] flex flex-col justify-center`} />
            <Text className={`px-2 font-bold text-lg italic text-white`}>{student?.Weapon?.Name}</Text>
         </View>

         <View className={`flex-row bg-[rgba(0,0,0,0.3)]`}>
            <Image source={{ uri: studentSchoolURL }} resizeMode="contain" className={`size-24`} />
            <View className={`px-2 justify-center`}>
               <Text className={`font-bold text-xl italic text-white`}>{school}</Text>
               <Text className={`text-base italic text-white`}>{club}</Text>
            </View>
         </View>

         <View className={`w-full flex-row flex-wrap bg-[rgba(0,0,0,0.3)]`}>
            <View className={`w-1/2 h-12 px-3 flex-row items-center`}>
               <Text style={styles.metadataName} numberOfLines={1} ellipsizeMode="tail">
                  Birthday
               </Text>
               <Text style={styles.metadataValue}>{student?.Birthday}</Text>
            </View>
            <View className={`w-1/2 h-12 px-3 flex-row items-center`}>
               <Text style={styles.metadataName} numberOfLines={1} ellipsizeMode="tail">
                  CV
               </Text>
               <Text style={styles.metadataValue}>{student?.CharacterVoice}</Text>
            </View>
            <View className={`w-1/2 h-12 px-3 flex-row items-center`}>
               <Text style={styles.metadataName} numberOfLines={1} ellipsizeMode="tail">
                  Age
               </Text>
               <Text style={styles.metadataValue}>{student?.CharacterAge}</Text>
            </View>
            <View className={`w-1/2 h-12 px-3 flex-row items-center`}>
               <Text style={styles.metadataName} numberOfLines={1} ellipsizeMode="tail">
                  Design
               </Text>
               <Text style={styles.metadataValue}>{student?.Designer}</Text>
            </View>
            <View className={`w-1/2 h-12 px-3 flex-row items-center`}>
               <Text style={styles.metadataName} numberOfLines={1} ellipsizeMode="tail">
                  Height
               </Text>
               <Text style={styles.metadataValue}>{student?.CharHeightMetric}</Text>
            </View>
            <View className={`w-1/2 h-12 px-3 flex-row items-center`}>
               <Text style={styles.metadataName} numberOfLines={1} ellipsizeMode="tail">
                  Illustrator
               </Text>
               <Text style={styles.metadataValue}>{student?.Illustrator}</Text>
            </View>
            <View className={`w-full h-12 px-3 flex-row items-center`}>
               <Text style={styles.metadataName} numberOfLines={1} ellipsizeMode="tail">
                  Hobbies
               </Text>
               <Text style={styles.metadataValue}>{student?.Hobby}</Text>
            </View>
         </View>

         <Text className={`px-3 text-base text-justify bg-[rgba(0,0,0,0.3)] text-white`}>{student?.ProfileIntroduction}</Text>
      </View>
   );
}

const styles = StyleSheet.create({
   metadataName: {
      fontSize: 16,
      flexGrow: 1,
      overflow: "hidden",
      color: "white",
   },
   metadataValue: {
      marginLeft: 10,
      marginRight: 0,
      fontSize: 16,
      fontWeight: "bold",
      flexShrink: 0,
      color: "white",
   },
});
