import db from "../lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export const updateSchema = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));

  querySnapshot.forEach(async (document) => {
    const postRef = doc(db, "posts", document.id);

    // Only update if the document does NOT have an audioUrl field
    if (!document.data().audioUrl) {
      await updateDoc(postRef, {
        audioUrl: null, // Set to null (default value)
      });
      console.log(`Updated post: ${document.id} with audioUrl field`);
    }
  });

  console.log("All posts updated to include 'audioUrl' field!");
};
