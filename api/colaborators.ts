import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  ColaboratorData,
  ColaboratorInterface,
} from "../public/colaboratorInterface";

//SET COLABORATOR
export async function setColaborator(colaborator: ColaboratorInterface) {
  try {
    const resp = await addDoc(collection(db, "colaborators"), colaborator);
    console.log("Document written: ", resp);
    return resp;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

//GET COLABORATOR
export async function getColaborators(): Promise<ColaboratorData[]> {
  const colaboratosRef = collection(db, "colaborators");
  const q = query(colaboratosRef);
  const colaborators: ColaboratorData[] = [];

  try {
    const colaboratorsSnapshot = await getDocs(q);
    colaboratorsSnapshot.forEach((doc) => {
      const data = doc.data();
      colaborators.push({
        id: doc.id,
        colaboratorName: data.colaboratorName,
        cpf: data.cpf,
        email: data.email,
        phone: data.phone,
        role: data.role,
        status: data.status, // Adicionando o status ao objeto ColaboratorData
      });
    });
    return colaborators;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
}

//DELETE COLABORATOR
export async function deleteColaborator(colaboratorId: string) {
  const colaboratorRef = doc(db, "colaborators", colaboratorId);
  try {
    const response = await deleteDoc(colaboratorRef);
    console.log("Colaborador excluido:", response);
    return response;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

// EDIT COLABORATOR
export async function editColaborator(colaborator: ColaboratorData) {
  const colaboratorRef = doc(db, "colaborators", colaborator.id);
  try {
    const resp = await setDoc(colaboratorRef, colaborator);
    console.log("Colaborador editado:", resp);
    return resp;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

//GET COLABORATOR status active
export interface ColaboratorOption {
  value: string;
  label: string;
}
export async function getActiveColaborators(): Promise<ColaboratorOption[]> {
  const colaboratosRef = collection(db, "colaborators");
  const q = query(colaboratosRef, where("status", "==", "Ativo"));
  const colaborators: ColaboratorOption[] = [];

  try {
    const colaboratorsSnapshot = await getDocs(q);
    colaboratorsSnapshot.forEach((doc) => {
      const data = doc.data();
      colaborators.push({
        value: doc.id,
        label: data.colaboratorName,
      });
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }

  return colaborators;
}
