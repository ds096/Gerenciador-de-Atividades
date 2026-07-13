"use client";
import MenuItens from "@/components/MenuItens";
import { SetColaboratorButton } from "@/components/SetColaboratorButton";

export default function Colaborators() {
  return (
    <div>
      <div>
        <MenuItens selectedKey="colaborators" />
      </div>
      <div className="p-6 space-y-4">
        <SetColaboratorButton />
      </div>
    </div>
  );
}
