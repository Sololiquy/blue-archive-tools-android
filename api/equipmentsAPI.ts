let equipmentCache: any[] | null = null;

export async function getEquipments() {
   if (equipmentCache) {
      return equipmentCache;
   }

   const response = await fetch("https://schaledb.com/data/en/equipment.min.json");
   const data = await response.json();
   equipmentCache = data;
   return data;
}
