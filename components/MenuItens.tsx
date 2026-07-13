"use client";
import type { MenuProps } from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Menu } from "antd";

// Itens do Menu
const items = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <LineChartOutlined />,
  },
  {
    label: "Atividades Realizadas",
    key: "activities",
    icon: <ProfileOutlined />,
  },
  {
    label: "Colaboradores",
    key: "colaborators",
    icon: <UserOutlined />,
  },
];

// Parametro do componente
interface MenuItensProps {
  selectedKey: string;
}

const MenuItens: React.FC<MenuItensProps> = ({ selectedKey }) => {
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    router.push(e.key);
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[selectedKey]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};

export default MenuItens;
