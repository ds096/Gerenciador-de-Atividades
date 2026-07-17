"use client";
import MenuItens from "@/components/MenuItens";
import { ActivitySetButton } from "@/components/ActivitySetButton";
import { ActivityTable } from "@/components/ActivityTable";
import { useEffect, useState } from "react";
import { ActivityData } from "@/public/activitieInterface";
import { deleteActivitie, getActivities } from "@/api/activities";
import { notification } from "antd";

export default function Activities() {
  const [data, setData] = useState<ActivityData[]>([]);

  useEffect(() => {
    async function fetchActivities() {
      const activities = await getActivities();
      setData(activities);
    }
    fetchActivities();
  }, []);

  return (
    <div>
      <div>
        <MenuItens selectedKey="activities" />
      </div>
      <div className="p-6 space-y-4">
        <ActivitySetButton />
        <ActivityTable data={data} />
      </div>
    </div>
  );
}
