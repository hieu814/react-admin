import { EditTwoTone, InfoCircleTwoTone } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import PropTypes from "prop-types";
import React from "react";

function QuestionAction(props) {
	const { question, setInitialValue, setIsModalVisible, setIsDetailViewMode } =
		props;
	const handleOnDetailClick = () => {
		setIsDetailViewMode(true);
		setInitialValue(question);
	};

	const handleOnUpdateClick = () => {
		setInitialValue(question);
		setIsModalVisible(true);
	};

	const menu = (
		<Menu>
			<Menu.Item onClick={handleOnDetailClick}>
				<div className="menu-adjust--center">
					<InfoCircleTwoTone />
					<span className="menu-title">Xem chi tiết</span>
				</div>
			</Menu.Item>

			<Menu.Divider />
			<Menu.Item onClick={handleOnUpdateClick}>
				<div className="menu-adjust--center">
					<EditTwoTone twoToneColor="#ad8b00" />
					<span className="menu-title">Sửa</span>
				</div>
			</Menu.Item>
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

QuestionAction.propTypes = {
	question: PropTypes.object,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
};

QuestionAction.defaultProps = {
	question: {},
	setInitialValue: null,
	setIsModalVisible: null,
};

export default QuestionAction;
