import { collection, getDocs } from "firebase/firestore";
import db from "./lib/firebase";

export const fetchPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
