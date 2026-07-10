export interface ActivityInterface {
  activityName: string;
  doneIn: string;
  colaborator: string;
  hoursSpent: number;
}

export interface ActivityData extends ActivityInterface {
  id: string; // só existe depois de lido do Firestore
}
