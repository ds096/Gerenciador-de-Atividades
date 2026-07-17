"use client";
import MenuItens from "@/components/MenuItens";
import { ActivitySetButton } from "@/components/ActivitySetButton";
import { ActivityTable } from "@/components/ActivityTable";
import { useEffect, useState } from "react";
import { ActivityData } from "@/public/activitieInterface";
import { getActivities } from "@/api/activities";
import { ActiveColaborators, getActiveColaborators } from "@/api/colaborators";

export default function Activities() {
  const [data, setData] = useState<ActivityData[]>([]);
  const [activeColaborators, setActiveColaborators] = useState<
    ActiveColaborators[]
  >([]);

  // GET ACTIVITIES DATA FOR ACTIVITY TABLE AND ACTIVIES COLABORATOR
  useEffect(() => {
    async function fetchData() {
      const fetchActivities = await getActivities();
      const fetchActiveColaborators = await getActiveColaborators();
      setData(fetchActivities);
      setActiveColaborators(fetchActiveColaborators);
    }
    fetchData();
  }, []);

  const handleSave = () => {};

  return (
    <div>
      <div>
        <MenuItens selectedKey="activities" />
      </div>
      <div className="p-6 space-y-4">
        <ActivitySetButton
          handleSave={handleSave}
          activeColaborators={activeColaborators}
        />
        <ActivityTable />
      </div>
    </div>
  );
}
