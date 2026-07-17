"use client";
import MenuItens from "@/components/MenuItens";
import { ActivitySetButton } from "@/components/ActivitySetButton";
import { ActivityTable } from "@/components/ActivityTable";
import { useEffect, useState } from "react";
import { ActivityData } from "@/public/activitieInterface";
import { deleteActivitie, getActivities } from "@/api/activities";
import { notification } from "antd";

export default function Activities() {
  const [activities, setActivities] = useState<ActivityData[]>([]);

  useEffect(() => {
    async function fetchActivities() {
      const activities = await getActivities();
      setActivities(activities);
    }
    fetchActivities();
  }, []);

  async function handleDeleteClick(recordId: string) {
    try {
      await deleteActivitie(recordId);
      setActivities((prev) => prev.filter((a) => a.id !== recordId));
      notification.success({
        message: "Atividade deletada com sucesso",
        placement: "topRight",
        duration: 1,
      });
    } catch (error) {
      notification.error({
        message: "Error ao deletar atividade",
        placement: "topRight",
        duration: 1,
      });
      throw error;
    }
  }

  async function handleSave() {}

  return (
    <div>
      <div>
        <MenuItens selectedKey="activities" />
      </div>
      <div className="p-6 space-y-4">
        <ActivitySetButton />
        <ActivityTable
          activities={activities}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </div>
  );
}
