"use client";
import { setColaborator } from "@/api/colaborators";
import { Button, Form, Modal, Select, Input } from "antd";
import { useState } from "react";

export function SetColaboratorButton(onSuccess) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const newColaborator = await form.validateFields();
      await setColaborator(newColaborator);
      form.resetFields();
      showModal();
    } catch {
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Cadastrar Colaborador
      </Button>

      <Modal
        title="Cadastro de Colaborador"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={showModal}
        confirmLoading={confirmLoading}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            label="Nome do Colaborador"
            name="colaboratorName"
            rules={[
              { required: true, message: "Informe o nome do colaborador" },
            ]}
          >
            <Input placeholder="Digite o nome completo" />
          </Form.Item>

          <Form.Item
            label="CPF"
            name="cpf"
            rules={[
              { required: true, message: "Informe o CPF" },
              {
                pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
                message: "CPF inválido",
              },
            ]}
          >
            <Input placeholder="000.000.000-00" maxLength={14} />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ type: "email", message: "E-mail inválido" }]}
          >
            <Input placeholder="exemplo@email.com" />
          </Form.Item>

          <Form.Item label="Telefone" name="phone">
            <Input placeholder="(00) 00000-0000" />
          </Form.Item>

          <Form.Item
            label="Cargo"
            name="role"
            rules={[{ required: true, message: "Função" }]}
          >
            <Input placeholder="Ex: Analista, Gerente..." />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Selecione o status" }]}
            initialValue="Ativo"
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
    </div>
  );
}
