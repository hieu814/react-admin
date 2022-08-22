import {
    DeleteTwoTone,
    EditTwoTone,
    ExclamationCircleOutlined,
    InfoCircleTwoTone,
} from "@ant-design/icons";
import { Modal } from "antd";
const { confirm, Text } = Modal;
export function ShowConfirm(message, onConfrim) {
    confirm({
        icon: <ExclamationCircleOutlined />,
        content: message,
        async onOk() {
            onConfrim();
        },
    });
}