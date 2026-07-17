"use client";

import { ActiveColaborators, getActiveColaborators } from "@/api/colaborators";
import {
  Button,
  Form,
  Modal,
  Select,
  Input,
  DatePicker,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";

interface ActivitySetButtonProps {
  handleSave: () => void;
  getactivityColaborator: () => void;
}

export function ActivitySetButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [colaboratorsOptions, setColaboratorsOptions] = useState<
    ActiveColaborators[]
  >([]);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchActiveColaborators() {
      try {
        const options = await getActiveColaborators();
        console.log("Active Colaborators:", options);
        setColaboratorsOptions(options);
      } catch (error) {
        console.error("Error fetching active colaborators:", error);
      }
    }
    fetchActiveColaborators();
  }, []);

  function showModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleOk() {}

  return (
    <>
      <div>
        <Button type="primary" onClick={showModal}>
          Cadastrar Atividade
        </Button>
        <Modal
          title="Cadastro de Atividade"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={showModal}
          confirmLoading={confirmLoading}
          okText="Salvar"
          cancelText="Cancelar"
        >
          <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
            <Form.Item
              label="Nome da Atividade"
              name="activityName"
              rules={[
                { required: true, message: "Informe o nome da atividade" },
              ]}
            >
              <Input placeholder="Nome da atividade" />
            </Form.Item>

            <Form.Item
              label="Horas "
              name="timeSpent"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Precisa ser um número inteiro"
                precision={0}
              />
            </Form.Item>
            <Form.Item
              label="Data da execução"
              name="doneIn"
              rules={[
                {
                  required: true,
                  message: "Informe a data de realização da atividade",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} placeholder="Data" />
            </Form.Item>
            <Form.Item
              label="Nome do Colaborador"
              name="colaboratorName"
              rules={[
                { required: true, message: "Informe o nome do colaborador" },
              ]}
            >
              <Select
                placeholder="Selecione um colaborador"
                options={colaboratorsOptions.map((c) => ({
                  value: c.colaboratorName,
                  label: c.colaboratorName,
                }))}
                onChange={(value) => {
                  const selected = colaboratorsOptions.find(
                    (c) => c.colaboratorName === value,
                  );
                  form.setFieldsValue({ cpf: selected?.cpf ?? "" });
                }}
              />
            </Form.Item>

            <Form.Item label="CPF" name="cpf">
              <Input disabled />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
