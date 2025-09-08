let enemyCache: any[] | null = null;

export async function getEnemies() {
   if (enemyCache) {
      return enemyCache;
   }

   const response = await fetch("https://schaledb.com/data/en/raids.min.json");
   const data = await response.json();
   enemyCache = data;
   return data;
}
