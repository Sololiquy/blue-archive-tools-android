// TEMPORARY, NEED FIX LATER

import { contextStudentDetail } from "app/studentDetail/useContextWrapper";
import React, { JSX, useContext } from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface parameterType {
   type: string;
   level: number;
}

function parseDescription(
   desc: string | undefined,
   params: any[][] | undefined,
   level: number,
   attackTypeClass: string,
   buffNames: Record<string, string>
) {
   if (!desc) return [];

   desc = desc
      .replace(/&times;/g, "×")
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");

   const parts: (JSX.Element | string)[] = [];
   const regex = /<\?(\d+)>|<(\w+):(\w+)>|<\/?b>/g;

   let lastIndex = 0;
   let match;

   let bold = false;

   while ((match = regex.exec(desc)) !== null) {
      if (lastIndex < match.index) {
         const textChunk = desc.slice(lastIndex, match.index);
         if (textChunk) {
            parts.push(
               <Text key={parts.length} className={bold ? "font-bold" : ""}>
                  {textChunk}
               </Text>
            );
         }
      }

      if (match[1]) {
         // <?1>
         const idx = parseInt(match[1], 10) - 1;
         const param = params?.[idx]?.[level - 1] || "?";
         parts.push(
            <Text key={parts.length} className={`${attackTypeClass} font-bold`}>
               {param}
            </Text>
         );
      } else if (match[2] && match[3]) {
         // <b:atk> etc
         const effect = match[2];
         const typeEffect = match[3];
         const effects = effect === "b" ? "Buff" : effect === "d" ? "Debuff" : effect === "c" ? "CC" : effect === "s" ? "Special" : "";

         const x = `${effects}_${typeEffect}`;
         const stat = buffNames[x] || x;

         const colorClass =
            effects === "Buff" ? "text-red-400" : effects === "Debuff" ? "text-blue-400" : effects === "CC" ? "text-yellow-400" : "text-purple-400";

         const iconEffects = `https://schaledb.com/images/buff/${effects}_${typeEffect}.webp`;

         // parts.push(
         //    <View key={parts.length} className="flex-row items-center">
         //       <Image source={{ uri: iconEffects }} resizeMode="contain" className="w-4 h-4 mr-1" />
         //       <Text className={`${colorClass} font-bold`}>{stat}</Text>
         //    </View>
         // );

         // const width = 6 * (Platform.OS === "ios" ? 1 : PixelRatio.get());
         // const height = 6 * (Platform.OS === "ios" ? 1 : PixelRatio.get());
         // parts.push(
         //    <View className={`flex-row`} style={{ height }}>
         //       <Text>
         //          <Image key={parts.length} source={{ uri: iconEffects }} resizeMode="contain" style={{ width, height }} />
         //       </Text>
         //       <Text key={parts.length} className={`${colorClass} font-bold pr-2`}>
         //          {stat}
         //       </Text>
         //    </View>
         // );
         parts.push(
            <Text key={parts.length} className={`${colorClass} font-bold`}>
               {stat}
            </Text>
         );

         // parts.push(
         //    <View key={parts.length} className="flex flex-row ">
         //       <Image source={{ uri: iconEffects }} resizeMode="contain" style={{ width, height }} />
         //       <Text className={`${colorClass} font-bold`}>{stat}</Text>
         //    </View>
         // );
      } else if (match[0] === "<b>") {
         bold = true;
      } else if (match[0] === "</b>") {
         bold = false;
      }

      lastIndex = regex.lastIndex;
   }

   if (lastIndex < desc.length) {
      parts.push(desc.slice(lastIndex));
   }

   return parts;
}

export default function Skill({ type, level }: parameterType) {
   const { student, localization } = useContext(contextStudentDetail);

   const attackType =
      {
         Explosion: "text-red-400",
         Pierce: "text-yellow-400",
         Mystic: "text-purple-400",
         Sonic: "text-blue-400",
      }[student?.BulletType as "Explosion" | "Pierce" | "Mystic" | "Sonic"] || "";

   const descriptionParts = parseDescription(
      student?.Skills[type]?.Desc,
      student?.Skills[type]?.Parameters,
      level,
      attackType,
      localization?.BuffName ?? {}
   );

   const skillImgURL = `https://schaledb.com/images/skill/${student?.Skills[type]?.Icon}.webp`;

   return (
      <ScrollView>
         {/* Main Skill */}
         <View className="flex flex-col">
            <View className="w-full h-24 flex flex-row items-center">
               <View className="relative w-24 h-24 items-center justify-center">
                  <Image source={{ uri: skillImgURL }} className="absolute w-20 h-20 z-40" resizeMode="contain" />
                  <Image
                     source={{ uri: `https://yourcdn.com/bg-Icon_${student?.BulletType}.png` }}
                     className="absolute w-24 h-24"
                     resizeMode="contain"
                  />
               </View>

               <View>
                  <Text className="font-bold text-xl tracking-normal text-white">{student?.Skills[type]?.Name}</Text>

                  <View className="my-1 flex flex-row">
                     {type === "Ex" && <Text className="font-semibold text-white">{`${student?.Skills[type]?.Cost?.[level - 1] || "0"} COST`}</Text>}
                     <Text className="pl-2 pr-4 text-base text-justify text-white">{type === "Ex" ? "Ex Skill" : type}</Text>
                  </View>
               </View>
            </View>

            <Text className="text-base px-2 text-justify flex-wrap text-white">{descriptionParts}</Text>
         </View>

         {/* Extra Skills */}
         {/* @ts-ignore */}
         {student?.Skills?.[type]?.ExtraSkills?.map((extra, i) => {
            const extraParts = parseDescription(extra?.Desc, extra?.Parameters, level, attackType, localization?.BuffName ?? {});

            const extraSkillImgURL = `https://schaledb.com/images/skill/${extra?.Icon}.webp`;

            return (
               <View className="mt-1 w-full" key={i}>
                  <View className="w-full h-24 flex flex-row items-center">
                     <View className="h-4/5 w-[1px] bg-white ml-2" />

                     <View className="relative w-24 h-24 items-center justify-center">
                        <Image source={{ uri: extraSkillImgURL }} className="absolute w-20 h-20 z-40" resizeMode="contain" />
                        <Image
                           source={{ uri: `https://yourcdn.com/bg-Icon_${student?.BulletType}.png` }}
                           className="absolute w-20 h-20"
                           resizeMode="contain"
                        />
                     </View>

                     <View>
                        <Text className="font-bold text-xl tracking-normal text-white">{extra?.Name}</Text>
                        {type === "Ex" && <Text className="font-semibold text-white">{`${extra?.Cost?.[level - 1] || "0"} COST`}</Text>}
                     </View>
                  </View>

                  <Text className="text-base px-2 text-justify flex-wrap text-white">{extraParts}</Text>
               </View>
            );
         })}
      </ScrollView>
   );
}
