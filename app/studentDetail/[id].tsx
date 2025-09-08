import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, View } from "react-native";

import { getEquipments } from "api/equipmentsAPI";
import { getStudents } from "api/studentsAPI";
import { getVoices } from "api/voicesAPI";

import ProfileComponent from "components/studentDetail/profile/main";
import SkillComponent from "components/studentDetail/skill/main";
import StatComponent from "components/studentDetail/stat/main";
import Tab from "components/studentDetail/tab";
import VoiceComponent from "components/studentDetail/voice/main";

export default function StudentDetail() {
   const { id } = useLocalSearchParams<{ id: string }>();
   const [student, setStudent] = useState<any | null>(null);
   const [voice, setVoice] = useState<any | null>(null);
   const [equipment, setEquipment] = useState([null, null, null]);

   const [tabIndex, setTabIndex] = useState(1);
   const [tierWeapon, setTierWeapon] = useState(0);
   const [tierStudent, setTierStudent] = useState(1);
   const [level, setLevel] = useState(1);
   const [levelWeapon, setLevelWeapon] = useState(1);
   const [levelEquipment, setLevelEquipment] = useState([1, 1, 1, 0]);
   const [bondRank, setBondRank] = useState(1);

   const [loading, setLoading] = useState(true);

   // get API data --------------------------------

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
            console.log(newEquipments);
            setEquipment(newEquipments);
         })
         .catch((err) => console.log(err));
   }, [student, levelEquipment]);

   //-------------------------------------------------

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

   const handleTabClick = (index: number) => {
      setTabIndex(index);
   };

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

            {/* container */}
            <View className="w-screen flex flex-col">
               {/* tabs */}
               <View className="w-full relative allCenter gap-1 mr-1 flex flex-row justify-center items-end">
                  <Tab onClick={() => handleTabClick(1)} active={tabIndex === 1} label="Stat" />
                  <Tab onClick={() => handleTabClick(2)} active={tabIndex === 2} label="Skill" />
                  <Tab onClick={() => handleTabClick(3)} active={tabIndex === 3} label="Profile" />
                  <Tab onClick={() => handleTabClick(4)} active={tabIndex === 4} label="Voice" />
               </View>

               <View className="w-full h-auto overflow-y-auto bg-[rgba(0,0,0,0.3)]">
                  {tabIndex === 1 && <StatComponent />}
                  {tabIndex === 2 && <SkillComponent />}
                  {tabIndex === 3 && <ProfileComponent />}
                  {tabIndex === 4 && <VoiceComponent />}
               </View>
            </View>

            <Text className="text-white text-2xl font-bold">
               {student?.FamilyName} {student?.PersonalName}
            </Text>
            <Text className="text-white mt-2">ID: {id}</Text>
         </ScrollView>
      </ImageBackground>
   );
}
