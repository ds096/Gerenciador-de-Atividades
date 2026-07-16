"use client";
import MenuItens from "@/components/MenuItens";
import { ActivitySetButton } from "@/components/ActivitySetButton";
import { ActivityTable } from "@/components/ActivityTable";
import { useEffect, useState } from "react";
import { ActivityData } from "@/public/activitieInterface";
import { getActivities } from "@/api/activities";

export default function Activities() {
  const [activities, setActivities] = useState<ActivityData[]>([]);

  useEffect(() => {
    async function fetchActivities() {
      const activities = await getActivities();
      setActivities(activities);
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
        <ActivityTable activities={activities} />
      </div>
    </div>
  );
}
