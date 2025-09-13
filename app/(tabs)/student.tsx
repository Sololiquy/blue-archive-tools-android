import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { getStudents } from "api/studentsAPI";

import Card from "@components/card/card_student_s";

export default function Student() {
   const [defaultStudents, setDefaultStudents] = useState<any[]>([]);
   const [student, setStudents] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   const [ascSort, setAscSort] = useState(true);
   const [searchValue, setSearchValue] = useState("");

   useEffect(() => {
      getStudents()
         .then((data) => {
            const studentsArray = Object.values(data).sort((a: any, b: any) => a.Name.localeCompare(b.Name));
            setDefaultStudents(studentsArray);
            setStudents(studentsArray);
         })
         .finally(() => setLoading(false));
   }, []);

   const search = () => {
      const result = defaultStudents.filter((s) => s.Name.toLowerCase().includes(searchValue.toLowerCase()));
      setStudents(result);
   };

   const sortByName = () => {
      if (!student) return;
      let sortedStudents;
      if (ascSort) {
         sortedStudents = [...student].sort((a, b) => b.Name.localeCompare(a.Name));
         setAscSort(false);
      } else {
         sortedStudents = [...student].sort((a, b) => a.Name.localeCompare(b.Name));
         setAscSort(true);
      }
      setStudents(sortedStudents);
   };

   if (loading) {
      return (
         <View className="flex-1 justify-center items-center bg-black">
            <Text className="text-white text-lg font-bold">Loading...</Text>
         </View>
      );
   }

   return (
      <View className="flex-1 bg-black">
         <View className="flex-row absolute top-10 px-4 z-[999]">
            <Pressable className="bg-blue-600 px-4 py-2 rounded-l-full" onPress={sortByName}>
               <Text className="text-white font-bold">Name</Text>
            </Pressable>
            <TextInput
               placeholder="Search"
               placeholderTextColor="lightgray"
               value={searchValue}
               onChangeText={setSearchValue}
               className="bg-white px-2 py-2 text-black flex-1"
            />
            <Pressable className="bg-blue-600 px-4 py-2 rounded-r-full" onPress={search}>
               <Text className="text-white font-bold">Search</Text>
            </Pressable>
         </View>

         {/* <FlatList
            data={student}
            keyExtractor={(item) => item.Id.toString()}
            className="px-2"
            numColumns={4}
            renderItem={({ item }) => <Card id={item.Id} name={item.Name} school={item.School} />}
            columnWrapperStyle={{ justifyContent: "space-between", gap: 4 }}
            contentContainerStyle={{ gap: 4, paddingBottom: 4, paddingTop: 74 }}
         /> */}

         <FlashList
            data={student}
            keyExtractor={(item) => item.Id.toString()}
            numColumns={4}
            renderItem={({ item }) => <Card id={item.Id} name={item.Name} school={item.School} />}
            estimatedItemSize={120}
            contentContainerStyle={{ paddingTop: 74, paddingBottom: 8 }}
         />
      </View>
   );
}
