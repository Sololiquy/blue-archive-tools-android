let localizationCache: any[] | null = null;

export async function getLocalizations() {
   if (localizationCache) {
      return localizationCache;
   }

   const response = await fetch("https://schaledb.com/data/en/localization.min.json");
   const data = await response.json();
   localizationCache = data;
   return data;
}
