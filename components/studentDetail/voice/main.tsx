import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import MediaPlayer from "./components/mediaPlayer";
import Tab from "./components/tab";

import { contextStudentDetail } from "app/studentDetail/useContextWrapper";

export default function Voice() {
   const { voice } = useContext(contextStudentDetail);
   const [voicetabIndex, setvoicetabIndex] = useState<number>(1);
   return (
      <View>
         <View className="relative flex flex-row justify-center">
            <Tab onClick={() => setvoicetabIndex(1)} active={voicetabIndex === 1} label="Battle" />
            <Tab onClick={() => setvoicetabIndex(2)} active={voicetabIndex === 2} label="Event" />
            <Tab onClick={() => setvoicetabIndex(3)} active={voicetabIndex === 3} label="Lobby" />
            <Tab onClick={() => setvoicetabIndex(4)} active={voicetabIndex === 4} label="Normal" />
         </View>

         <View className="flex flex-col gap-1">
            {voicetabIndex === 1 && voice.Battle?.map((voice: any, index: number) => <MediaPlayer key={index} voice={voice} />)}
            {voicetabIndex === 2 && voice.Event?.map((voice: any, index: number) => <MediaPlayer key={index} voice={voice} />)}
            {voicetabIndex === 3 && voice.Lobby?.map((voice: any, index: number) => <MediaPlayer key={index} voice={voice} />)}
            {voicetabIndex === 4 && voice.Normal?.map((voice: any, index: number) => <MediaPlayer key={index} voice={voice} />)}
         </View>
      </View>
   );
}

const styles = StyleSheet.create({});
