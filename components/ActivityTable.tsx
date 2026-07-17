import {
  Space,
  Table,
  Tooltip,
  Button,
  Form,
  Modal,
  Input,
  Select,
  Popconfirm,
} from "antd";
import { ActivityData } from "@/public/activitieInterface";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

interface ActivityTableProps {
  activities: ActivityData[];
  handleDeleteClick: (recordId: string) => void;
}

export function ActivityTable({
  activities,
  handleDeleteClick,
}: ActivityTableProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<ActivityData | null>(null);

  function handleCancel() {}

  async function handleSave() {}

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
    {
      title: "Ações",
      key: "actions",
      width: 100,
      align: "center" as const,
      render: (_: unknown, record: ActivityData) => (
        <Space>
          <Tooltip title="Editar">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEditClick(record)}
            />
          </Tooltip>
          <Tooltip title="Deletar">
            <Popconfirm
              title="Excluir colaborador"
              description="Essa ação não pode ser desfeita."
              onConfirm={() => handleDeleteClick(record.id)}
              okText="Sim"
              cancelText="Cancelar"
              okButtonProps={{ danger: true }}
            >
              <Button type="text" icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Modal
        title="Editar atividade"
        open={isModalOpen}
        onOk={() => handleSave()}
        onCancel={handleCancel}
        okText="Salvar"
        cancelText="Cancelar"
      ></Modal>
      <Table
        dataSource={activities}
        columns={columns}
        rowKey={(activities) => activities.id}
      ></Table>
    </>
  );
}
