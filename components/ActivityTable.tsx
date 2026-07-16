import { Table } from "antd";
import { ActivityData } from "@/public/activitieInterface";

export function ActivityTable({ activities }: { activities: ActivityData[] }) {
  const columns = [
    {
      title: "Nome da Atividade",
      dataIndex: "activityName",
      key: "activityName",
    },
    {
      title: "Nome do Colaborador",
      dataIndex: "colaboratorName",
      key: "colaboratorName",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "Realizado em",
      dataIndex: "doneIn",
      key: "doneIn",
    },
    {
      title: "Horas necessárias",
      dataIndex: "hoursSpent",
      key: "hoursSpent",
    },
  ];
  return (
    <Table
      dataSource={activities}
      columns={columns}
      rowKey={(activities) => activities.id}
    ></Table>
  );
}
