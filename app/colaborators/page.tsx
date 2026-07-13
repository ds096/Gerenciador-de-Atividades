"use client";
import MenuItens from "@/components/MenuItens";
import { SetColaboratorButton } from "@/components/ColaboratorSetButton";
import ColaboratorsTable from "@/components/ColaboratorTable";
import { useRef } from "react";
import { ColaboratorData } from "@/public/colaboratorInterface";

export default function Colaborators() {
  const tableRef = useRef(null);
  const handleCreateColaborator = (colaborator: ColaboratorData) => {
    tableRef.current?.addColaborator(colaborator);
  };
  return (
    <div>
      <div>
        <MenuItens selectedKey="colaborators" />
      </div>
      <div className="p-6 space-y-4">
        <SetColaboratorButton onSuccess={handleCreateColaborator} />
        <ColaboratorsTable ref={tableRef} />
      </div>
    </div>
  );
}
