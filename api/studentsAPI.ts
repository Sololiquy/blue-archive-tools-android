let studentCache: any[] | null = null;

export async function getStudents() {
   if (studentCache) {
      // Return cached data
      return studentCache;
   }

   const response = await fetch("https://schaledb.com/data/en/students.min.json");
   const data = await response.json();
   studentCache = data; // cache for app session
   return data;
}
