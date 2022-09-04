import {
	EditTwoTone,
	InfoCircleTwoTone,
	QuestionCircleTwoTone,
} from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from 'react-router-dom';
function ParagraphAction(props) {
	const {
		paragraph,
		setInitialValue,
		setIsModalVisible,
		part,
		examId,
		setIsDetailViewMode,
	} = props;
	const navigate = useNavigate();

	const handleOnDetailClick = () => {
		setIsDetailViewMode(true);
		setInitialValue(paragraph);
	};
	const handleOnQuestionClick = () => {
		navigate(
			`/exams/paragraphs/questions?examId=${examId}&part=${part}&paragraphId=${paragraph.id}`
		);
	};

	const handleOnUpdateClick = () => {
		const initialValue = {
			id: paragraph.id,
			image: paragraph.image,
			content: paragraph.paragraph,
			transcript: paragraph.transcript,
		};
		setInitialValue(initialValue);
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

			<Menu.Item onClick={handleOnQuestionClick}>
				<div className="menu-adjust--center">
					<QuestionCircleTwoTone />
					<span className="menu-title">Câu hỏi</span>
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

ParagraphAction.propTypes = {
	paragraph: PropTypes.object,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsDetailViewMode: PropTypes.func,
};

ParagraphAction.defaultProps = {
	paragraph: {},
	setInitialValue: null,
	setIsModalVisible: null,
	setIsDetailViewMode: null,
};

export default ParagraphAction;
