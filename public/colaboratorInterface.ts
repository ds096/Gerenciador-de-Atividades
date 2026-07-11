export interface ColaboratorInterface {
  colaboratorName: string;
  cpf: string;
  email?: string;
  phone?: string;
  role?: string;
  status: "Ativo" | "Inativo";
}

export interface ColaboratorData extends ColaboratorInterface {
  id: string; // só existe depois de lido do Firestore
}
