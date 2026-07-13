"use client";
import MenuItens from "@/components/MenuItens";
import { SetColaboratorButton } from "@/components/ColaboratorSetButton";
import ColaboratorsTable from "@/components/ColaboratorTable";
import { useState, useCallback } from "react";

export default function Colaborators() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleColaboratorCreated = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);
  return (
    <div>
      <div>
        <MenuItens selectedKey="colaborators" />
      </div>
      <div className="p-6 space-y-4">
        <SetColaboratorButton onSuccess={handleColaboratorCreated} />
        <ColaboratorsTable refreshKey={refreshKey} />
      </div>
    </div>
  );
}
