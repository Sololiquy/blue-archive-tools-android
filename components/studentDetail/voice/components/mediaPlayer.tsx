import { Audio } from "expo-av";
import React, { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { contextStudentDetail } from "app/studentDetail/useContextWrapper";

interface parameterType {
   voice: {
      Group: string;
      Transcription: string;
      AudioClip: string;
   };
}

export default function MediaPlayer({ voice }: parameterType) {
   const { localization } = useContext(contextStudentDetail);
   const [voiceTitle, setVoiceTitle] = useState<string>("");
   const [sound, setSound] = useState<Audio.Sound | null>(null);

   useEffect(() => {
      if (!voice || !localization) return;

      const [x, y] = (voice?.Group.match(/^(\D+)(\d*)$/) || ["", "", ""]).slice(1);
      const newTitle = localization?.VoiceClip[x as keyof typeof localization.VoiceClip]?.replace("{0}", y) ?? "";

      setVoiceTitle(newTitle);
   }, [voice, localization]);

   if (!voice) return null;

   async function playSound() {
      if (sound) {
         await sound.unloadAsync();
         setSound(null);
      }

      const { sound: newSound } = await Audio.Sound.createAsync({
         uri: `https://r2.schaledb.com/voice/${voice.AudioClip}`,
      });

      setSound(newSound);
      await newSound.playAsync();
   }

   return (
      <View className={`p-2 gap-1 bg-[rgba(0,0,0,0.3)]`}>
         <View className={`flex-row items-center`}>
            <Button title="Play" onPress={playSound} />
            <Text className={`ml-2 font-bold text-white`}>{voiceTitle}</Text>
         </View>
         <Text className={`text-justify text-white`}>{voice?.Transcription}</Text>
      </View>
   );
}

const styles = StyleSheet.create({});
