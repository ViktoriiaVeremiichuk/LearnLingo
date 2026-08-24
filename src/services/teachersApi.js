import { getDatabase, ref, get } from "firebase/database";

const db = getDatabase();

export const getTeachers = async () => {
  const teachersRef = ref(db, "/");
  const snapshot = await get(teachersRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
};
