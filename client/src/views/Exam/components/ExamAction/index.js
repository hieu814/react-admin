import {
	DeleteTwoTone,
	EditTwoTone,
	ExclamationCircleOutlined,
	InfoCircleTwoTone,
} from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Dropdown, Menu, message, Modal } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { deleteExam, fetchExams } from "src/stores/exam/examSlice";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "./style.scss";

const { confirm, Text } = Modal;

function ExamAction(props) {
	const parts = [1, 2, 3, 4, 5, 6, 7];
	const { exam, setInitialValue, setIsModalVisible, setIsAddMode, query } =
		props;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleOnDetailClick = (part) => {
		const page = "questions";
		navigate(`/exams/${page}?examId=${exam._id}&part=${part}`);
	};

	const handleOnUpdateClick = () => {
		setInitialValue(exam);
		setIsAddMode(false);
		setIsModalVisible(true);
	};

	const handleOnDeleteClick = async () => {
		confirm({
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có muốn xóa bài thi này không ?",
			async onOk() {
				try {
					unwrapResult(await dispatch(deleteExam({ examId: exam._id })));
					message.success("Xóa thành công");
					dispatch(fetchExams(query));
				} catch (error) {
					message.error("Xóa thất bại");
				}
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const menu = (
		<Menu>
			<Menu.Item>
				<SubMenu
					key="sub1"
					title={
						<>
							<InfoCircleTwoTone />
							<span className="menu-title">Chi tiết</span>
						</>
					}
				>
					{parts.map((part) => (
						<Menu.Item onClick={() => handleOnDetailClick(part)}>
							<div className="menu-adjust--center">
								<InfoCircleTwoTone />
								<span className="menu-title">Part {part}</span>
							</div>
						</Menu.Item>
					))}
				</SubMenu>
			</Menu.Item>

			<Menu.Divider />
			<Menu.Item onClick={handleOnUpdateClick}>
				<div className="menu-adjust--center">
					<EditTwoTone twoToneColor="#ad8b00" />
					<span className="menu-title">Sửa</span>
				</div>
			</Menu.Item>

			<Menu.Divider />
			<Menu.Item onClick={handleOnDeleteClick}>
				<div className="menu-adjust--center">
					<DeleteTwoTone twoToneColor="#a8071a" />
					<span className="menu-title">Xóa</span>
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

ExamAction.propTypes = {
	exam: PropTypes.object,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsAddMode: PropTypes.func,
};

ExamAction.defaultProps = {
	exam: {},
	setInitialValue: null,
	setIsModalVisible: null,
	setIsAddMode: null,
};

export default ExamAction;
