import { getStudents } from "api/studentsAPI";
import Card from "components/card/simple_student_s";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Student() {
   const [students, setStudents] = useState<any[]>([]);
   const [filtered, setFiltered] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [searchValue, setSearchValue] = useState("");

   useEffect(() => {
      getStudents()
         .then((data) => {
            const studentsArray = Object.values(data);
            setStudents(studentsArray);
            setFiltered(studentsArray);
         })
         .finally(() => setLoading(false));
   }, []);

   const search = () => {
      const result = students.filter((s) => s.Name.toLowerCase().includes(searchValue.toLowerCase()));
      setFiltered(result);
   };

   const sortByName = () => {
      const result = [...filtered].sort((a, b) => a.Name.localeCompare(b.Name));
      setFiltered(result);
   };

   if (loading) {
      return (
         <SafeAreaView className="flex-1 justify-center items-center bg-black">
            <Text className="text-white text-lg font-bold">Loading...</Text>
         </SafeAreaView>
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

         {/* Grid of Cards */}
         <FlatList
            data={filtered}
            keyExtractor={(item) => item.Id.toString()}
            className="px-2 pt-20"
            numColumns={4}
            renderItem={({ item }) => <Card id={item.Id} name={item.Name} school={item.School} />}
            columnWrapperStyle={{ justifyContent: "space-between" }}
         />
      </View>
   );
}
