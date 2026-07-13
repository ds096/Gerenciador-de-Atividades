"use client";

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
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ColaboratorData } from "@/public/colaboratorInterface";

const ColaboratorsTable: React.FC = () => {
  const [data, setData] = useState<ColaboratorData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [editingRecord, setEditingRecord] = useState<ColaboratorData | null>(
    null,
  );

  // Carrega os dados dos colaboradores ao montar o componente
  useEffect(() => {}, []);

  const handleEditClick = (record: ColaboratorData) => {};

  const handleCancel = () => {};

  const handleSave = async () => {};

  const handleDeleteClick = async (recordId: string) => {};

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    { title: "CPF", dataIndex: "cpf", key: "cpf" },
    { title: "Cargo", dataIndex: "role", key: "role" },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ações",
      key: "actions",
      width: 100,
      align: "center" as const,
      render: (_: unknown, record: ColaboratorData) => (
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

  return;
  <div></div>;
};

export default ColaboratorsTable;
