import React from "react";
import { Menu, Dropdown, Button, Modal } from "antd";
import { ShowConfirm } from '../components/ConfirmModal'


function MyAction(props) {
    const { handleAction } = props;

    const handleUpdate = () => {
        handleAction(false);
    };

    const handleDelete = async () => {
        ShowConfirm("Bạn có chắc không?", function () {
            handleAction(true);
        })
    };

    const menu = (
        <Menu>
            {/* <Menu.Item>Xem chi tiết</Menu.Item> */}
            <Menu.Divider />
            <Menu.Item onClick={handleUpdate}>Sửa</Menu.Item>

            <Menu.Divider />
            <Menu.Item onClick={handleDelete}>Xóa</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomLeft">
            <Button type="primary" ghost>
                Thao tác
            </Button>
        </Dropdown>
    );
}

export default MyAction;
