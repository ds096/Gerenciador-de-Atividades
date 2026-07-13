"use client";
import MenuItens from "@/components/MenuItens";
import { SetColaboratorButton } from "@/components/ColaboratorSetButton";
import ColaboratorsTable from "@/components/ColaboratorTable";

export default function Colaborators() {
  return (
    <div>
      <div>
        <MenuItens selectedKey="colaborators" />
      </div>
      <div className="p-6 space-y-4">
        <SetColaboratorButton />
        <ColaboratorsTable />
      </div>
    </div>
  );
}
