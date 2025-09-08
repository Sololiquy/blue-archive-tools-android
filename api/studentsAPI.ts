let studentCache: any[] | null = null;

export async function getStudents() {
   if (studentCache) {
      return studentCache;
   }

   const response = await fetch("https://schaledb.com/data/en/students.min.json");
   const data = await response.json();
   studentCache = data;
   return data;
}
