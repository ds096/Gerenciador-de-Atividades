import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  query,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ActivityInterface, ActivityData } from "../public/activitieInterface";

//SET ACTIVITY
export async function setActivity(activity: ActivityInterface) {
  try {
    const resp = await addDoc(collection(db, "activities"), activity);
    console.log("Document written: ", resp);
    return resp;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

// GET ACTIVITIES
export async function getActivities(): Promise<ActivityData[]> {
  const activitieRef = collection(db, "activities");
  const q = query(activitieRef);
  const activities: ActivityData[] = [];

  try {
    const activitiesSnapshot = await getDocs(q);
    activitiesSnapshot.forEach((doc) => {
      const data = doc.data();
      activities.push({
        id: doc.id,
        activityName: data.activityName,
        doneIn: data.doneIn,
        colaboratorName: data.colaboratorName,
        cpf: data.cpf,
        hoursSpent: data.hoursSpent,
      });
    });
    return activities;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
}

//DELETE ACTIVITIE
export async function deleteActivitie(activitieId: string) {
  const actvitieRef = doc(db, "activities", activitieId);
  try {
    const response = await deleteDoc(actvitieRef);
    console.log("Atividade exlcuida:", response);
    return response;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

// EDIT activity
export async function editactivity(activity: ActivityData) {
  const activityRef = doc(db, "activitys", activity.id);
  try {
    const resp = await setDoc(activityRef, activity);
    console.log("Atividade editada:", resp);
    return resp;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}
