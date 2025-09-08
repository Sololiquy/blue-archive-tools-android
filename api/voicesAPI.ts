let voiceCache: any[] | null = null;

export async function getVoices() {
   if (voiceCache) {
      return voiceCache;
   }

   const response = await fetch("https://schaledb.com/data/en/voice.min.json");
   const data = await response.json();
   voiceCache = data;
   return data;
}
