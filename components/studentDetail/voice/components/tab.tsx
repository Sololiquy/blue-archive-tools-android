import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface parameterType {
   onClick: () => void;
   active: boolean;
   label: string;
}

export default function Tab({ onClick, active, label }: parameterType) {
   return (
      <Pressable className={`w-24 h-8 m-1 rounded-md flex allCenter bg-[rgba(0,0,0,0.3)] ${active ? " !bg-white " : ""}`} onPress={onClick}>
         <Text className={`${active ? "!font-bold !text-black" : ""}`}>{label}</Text>
      </Pressable>
   );
}

const styles = StyleSheet.create({});
