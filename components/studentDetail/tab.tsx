import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import "app/global.css";

interface parameterType {
   onClick: () => void;
   active: boolean;
   label: string;
}

export default function Tab({ onClick, active, label }: parameterType) {
   return (
      <View className="flex">
         <Pressable className={`w-20 h-auto flex p-2  rounded-t-[20px] bg-[rgba(0,0,0,0.3)] ${active ? `!bg-black` : ``}`} onPress={onClick}>
            <Text className={`w-16 h-auto rounded-full text-center bg-white ${active ? `!font-bold` : ``}`}>{label}</Text>
         </Pressable>
      </View>
   );
}

const styles = StyleSheet.create({});
