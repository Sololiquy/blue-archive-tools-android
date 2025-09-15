import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, View } from "react-native";

import { getEquipments } from "api/equipmentsAPI";
import { getLocalizations } from "api/localizationsAPI";
import { getStudents } from "api/studentsAPI";
import { getVoices } from "api/voicesAPI";

import ProfileComponent from "components/studentDetail/profile/main";
import SkillComponent from "components/studentDetail/skill/main";
import StatComponent from "components/studentDetail/stat/main";
import Tab from "components/studentDetail/tab";
import VoiceComponent from "components/studentDetail/voice/main";

import { contextStudentDetail } from "./useContextWrapper";

export default function StudentDetail() {
   const { id } = useLocalSearchParams<{ id: string }>();
   const [student, setStudent] = useState<any | null>(null);
   const [level, setLevel] = useState(1);
   const [tierStudent, setTierStudent] = useState(1);
   const [voice, setVoice] = useState<any | null>(null);

   const [equipment, setEquipment] = useState([null, null, null]);
   const [levelEquipment, setLevelEquipment] = useState([1, 1, 1, 0]);

   const [levelWeapon, setLevelWeapon] = useState(1);
   const [tierWeapon, setTierWeapon] = useState(0);
   const [bondRank, setBondRank] = useState(1);

   const [tabIndex, setTabIndex] = useState(1);
   const [loading, setLoading] = useState(true);

   const [localization, setLocalization] = useState([null]);

   // get API data --------------------------------

   useEffect(() => {
      getLocalizations()
         .then((data) => setLocalization(data))
         .catch((err) => console.log("Localization fetch failed", err));
   }, []);

   useEffect(() => {
      getStudents()
         .then((data) => {
            const student = data[id];
            setStudent(student);
         })
         .finally(() => setLoading(false));
   }, [id]);

   useEffect(() => {
      getVoices()
         .then((data) => {
            const voice = data[id];
            setVoice(voice);
         })
         .catch((err) => console.log(err));
   }, [id]);

   useEffect(() => {
      if (!student) return;
      getEquipments()
         .then((data) => {
            const equipmentsArray = Object.values(data);

            const findEquipment = (category: string, tier: number) =>
               equipmentsArray.find((eq: any) => eq.Category === category && eq.Tier === tier) || null;

            const newEquipments = student.Equipment.map((cat: string, index: number) => findEquipment(cat, levelEquipment[index]));
            setEquipment(newEquipments);
         })
         .catch((err) => console.log(err));
   }, [student, levelEquipment]);

   // Functions-------------------------------------------------
   const handleTierWeaponChange = (index: number) => {
      if (index === tierWeapon) setTierWeapon(0);
      else setTierWeapon(index);
   };

   const handleBondLevelChange = (value: number) => {
      let x = value;
      if (x < 1) {
         x = 1;
      } else if (x > 50) {
         x = 50;
      }
      setBondRank(x);
   };

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
      <ImageBackground source={{ uri: backgroundURL }} className="flex-1">
         <View className="absolute inset-0" style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }} />

         <ScrollView contentContainerStyle={{ alignItems: "center", paddingTop: 40 }} showsVerticalScrollIndicator={false}>
            {/* sprite */}
            <View className="h-[84vh]">
               <Image source={{ uri: studentSpriteURL }} resizeMode="contain" className="h-full aspect-[1]" />
            </View>

            {/* container */}
            <View className="w-screen flex flex-col">
               {/* tabs */}
               <View className="w-full relative allCenter gap-1 mr-1 flex flex-row justify-center items-end">
                  <Tab onClick={() => setTabIndex(1)} active={tabIndex === 1} label="Stat" />
                  <Tab onClick={() => setTabIndex(2)} active={tabIndex === 2} label="Skill" />
                  <Tab onClick={() => setTabIndex(3)} active={tabIndex === 3} label="Profile" />
                  <Tab onClick={() => setTabIndex(4)} active={tabIndex === 4} label="Voice" />
               </View>

               {/* content */}
               <View className="w-full h-auto overflow-y-auto pb-16 bg-[rgba(0,0,0,0.3)]">
                  <contextStudentDetail.Provider
                     value={{
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
                        localization,
                     }}
                  >
                     {tabIndex === 1 && (
                        <StatComponent handleTierWeaponChange={handleTierWeaponChange} handleBondLevelChange={handleBondLevelChange} />
                     )}
                     {tabIndex === 2 && <SkillComponent handleTierWeaponChange={handleTierWeaponChange} />}
                     {tabIndex === 3 && <ProfileComponent />}
                     {tabIndex === 4 && <VoiceComponent />}
                  </contextStudentDetail.Provider>
               </View>
            </View>
         </ScrollView>
      </ImageBackground>
   );
}
