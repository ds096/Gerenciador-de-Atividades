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
import {
  deleteColaborator,
  editColaborator,
  getColaborators,
} from "@/api/colaborators";

function ColaboratorsTable({ refreshKey }: { refreshKey: number }) {
  const [form] = Form.useForm<ColaboratorData>();

  const [data, setData] = useState<ColaboratorData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<ColaboratorData | null>(
    null,
  );

  // Carrega os dados dos colaboradores ao montar o componente
  useEffect(() => {
    const fetchColaborators = async () => {
      const colaborators = await getColaborators();
      setData(colaborators);
    };
    fetchColaborators();
  }, [refreshKey]);

  const handleEditClick = (record: ColaboratorData) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);
      if (!editingRecord) {
        console.error("No record is being edited.");
        return;
      }

      const updatedRecord: ColaboratorData = {
        ...editingRecord,
        ...values,
      };

      const resp = await editColaborator(updatedRecord);
      console.log("Colaborador editado:", resp);
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedRecord.id ? updatedRecord : item,
        ),
      );
      setIsModalOpen(false);
      setEditingRecord(null);
      form.resetFields();
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  const handleDeleteClick = async (recordId: string) => {
    try {
      console.log("Deleting colaborator with ID:", recordId);
      const respose = await deleteColaborator(recordId);
      console.log("Colaborator deleted:", respose);
      setData((prevData) => prevData.filter((item) => item.id !== recordId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "colaboratorName",
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

  return (
    <>
      <Modal
        title="Editar colaborador"
        open={isModalOpen}
        onOk={() => handleSave()}
        onCancel={handleCancel}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form<ColaboratorData> form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: "Por favor, insira o nome" }]}
            initialValue={editingRecord?.colaboratorName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Cargo"
            rules={[{ required: true, message: "Por favor, insira o cargo" }]}
            initialValue={editingRecord?.role}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cpf"
            label="CPF"
            rules={[{ required: true, message: "Por favor, insira o CPF" }]}
            initialValue={editingRecord?.cpf}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Por favor, insira o email" }]}
            initialValue={editingRecord?.email}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Telefone"
            rules={[
              { required: true, message: "Por favor, insira o telefone" },
            ]}
            initialValue={editingRecord?.phone}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Por favor, insira o status" }]}
            initialValue={editingRecord?.status}
          >
            <Select
              options={[
                { value: "Ativo", label: "Ativo" },
                { value: "Inativo", label: "Inativo" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={data} columns={columns} rowKey={(data) => data.id} />
    </>
  );
}

export default ColaboratorsTable;
