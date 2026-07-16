export interface ActivityInterface {
  activityName: string;
  doneIn: string;
  colaboratorName: string;
  cpf: string;
  hoursSpent: number;
}

export interface ActivityData extends ActivityInterface {
  id: string; // só existe depois de lido do Firestore
}
