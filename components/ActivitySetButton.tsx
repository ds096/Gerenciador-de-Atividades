"use client";
import { ActiveColaborators } from "@/api/colaborators";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  DatePicker,
} from "antd";
import { useState } from "react";

interface ActivitySetButtonProps {
  handleSave: () => void;
  activeColaborators: ActiveColaborators[];
}

export const ActivitySetButton = ({
  handleSave,
  activeColaborators,
}: ActivitySetButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCancel = () => {
    setIsModalOpen(false);
    // Tem que adicionar mais coisas
  };

  //CPF vem automático fazer
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Inserir Atividade
      </Button>
      <Modal
        title="Cadastro de Atividade"
        open={isModalOpen}
        onOk={handleSave}
        onCancel={onCancel}
        confirmLoading={confirmLoading}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical" name="activityForm">
          <Form.Item
            label="Nome da Atividade"
            name="activityName"
            rules={[{ required: true, message: "Informe o nome da atividade" }]}
          >
            <Input placeholder="Digite o nome da atividade" />
          </Form.Item>

          <Form.Item
            label="Realizado em"
            name="doneIn"
            rules={[
              { required: true, message: "Informe a data de realização" },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Ex: 2024-05-01"
            />
          </Form.Item>

          <Form.Item
            label="Horas Gastas"
            name="hoursSpent"
            rules={[{ required: true, message: "Informe as horas gastas" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Insira um valor inteiro. Ex: 4"
            />
          </Form.Item>

          <Form.Item
            label="Colaborador"
            name="colaboratorName"
            rules={[{ required: true, message: "Selecione um colaborador" }]}
          >
            <Select
              placeholder="Selecione o colaborador"
              onChange={(value: string) => {
                const selected = activeColaborators.find(
                  (c) => c.colaboratorName === value,
                );
                form.setFieldValue("cpf", selected?.cpf ?? "");
              }}
              options={activeColaborators.map((c) => ({
                label: c.colaboratorName,
                value: c.colaboratorName,
              }))}
            />
          </Form.Item>

          <Form.Item label="CPF" name="cpf">
            <Input disabled placeholder="Preenchido automaticamente" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
