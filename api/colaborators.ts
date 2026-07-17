import { notification } from "antd";
import { db } from "./firebaseConfig";
import {
  collection,
  setDoc,
  query,
  where,
  getDocs,
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
    const colaboratorsRef = collection(db, "colaborators");
    const colaboratorDoc = doc(colaboratorsRef, colaborator.cpf);
    const existingDoc = await cpfExistis(colaborator.cpf);
    if (existingDoc) {
      notification.error({
        message: "Erro",
        description: "Número de CPF já cadastrado no sistema",
        placement: "topRight",
        duration: 1,
      });
      throw new Error("Já existe um colaborador cadastrado com este CPF.");
    }
    await setDoc(colaboratorDoc, colaborator);
    console.log("Document written:", colaborator);
    notification.success({
      message: "Cadastro realizado com Sucesso",
      description: "Colaborador adicionado",
      placement: "topRight",
      duration: 1,
    });
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    notification.error({
      message: "Erro",
      description: "Falha ao cadastro colaborador",
      placement: "topRight",
      duration: 1,
    });
    throw error;
  }
}

// VERIFICA SE O CPF JÁ EXISTE NO BANCO
export async function cpfExistis(cpf: string): Promise<boolean> {
  const colaboratorsRef = collection(db, "colaborators");
  const q = query(colaboratorsRef, where("cpf", "==", cpf));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
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
    notification.success({
      message: "Sucesso",
      description: "Colaborador deletado com sucesso",
      placement: "topRight",
      duration: 1,
    });
  } catch (error) {
    notification.error({
      message: "Erro",
      description: "Falha ao deletar colaborador",
      placement: "topRight",
      duration: 1,
    });
    console.error("Error adding document: ", error);
    throw error;
  }
}

// EDIT COLABORATOR
export async function editColaborator(colaborator: ColaboratorData) {
  const colaboratorRef = doc(db, "colaborators", colaborator.id);
  try {
    const resp = await setDoc(colaboratorRef, colaborator);
    notification.success({
      message: "Sucesso",
      description: "Colaborador editado com sucesso",
      placement: "topRight",
      duration: 1,
    });
    console.log("Colaborador editado:", resp);
    return resp;
  } catch (error) {
    console.error("Error adding document: ", error);
    notification.error({
      message: "Erro",
      description: "Falha ao editar colaborador",
      placement: "topRight",
      duration: 1,
    });
    throw error;
  }
}

//GET COLABORATOR status active

export interface ActiveColaborators {
  colaboratorName: string;
  cpf: string;
}
export async function getActiveColaborators(): Promise<ActiveColaborators[]> {
  const colaboratosRef = collection(db, "colaborators");
  const q = query(colaboratosRef, where("status", "==", "Ativo"));
  const colaborators: ActiveColaborators[] = [];

  try {
    const colaboratorsSnapshot = await getDocs(q);
    colaboratorsSnapshot.forEach((doc) => {
      const data = doc.data();
      colaborators.push({
        cpf: doc.id,
        colaboratorName: data.colaboratorName,
      });
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }

  return colaborators;
}
