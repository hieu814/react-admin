import { EditTwoTone, InfoCircleTwoTone } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
function QuestionAction(props) {
	const navigate = useNavigate()
	const { setIsModalVisible, question } = props;
	const handleOnUpdateClick = () => {
		setIsModalVisible(true);
	};
	const handleDetailClick = () => {
		navigate(`/exams/questionDetail?questionId=${question._id || "-"}`);
	};
	const handlePasageClick = () => {
		///exams/paragraphs
		navigate(`/exams/paragraphs?questionId=${question._id || "-"}`);
	};

	const menu = (
		<Menu>
			{
				![6, 7].includes(question.type) &&
				(
					<Menu.Item onClick={handleOnUpdateClick}>
						<div className="menu-adjust--center">
							<EditTwoTone twoToneColor="#ad8b00" />
							<span className="menu-title">{question.type}</span>
						</div>
					</Menu.Item>
				)
			}
			{([1, 2, 3, 5].includes(props.type)) && (<Menu.Divider />)}
			{
				(![1, 2, 3, 5].includes(props.type)) && (<Menu.Item onClick={handleDetailClick}>
					<div className="menu-adjust--center">
						<InfoCircleTwoTone />
						<span className="menu-title">Chi tiết câu hỏi</span>
					</div>
				</Menu.Item>)
			}
			{(question?.passages.length > 0) && (<Menu.Divider />)}
			{
				(question?.passages.length > 0) &&
				(<Menu.Item onClick={handlePasageClick}>
					<div className="menu-adjust--center">
						<InfoCircleTwoTone />
						<span className="menu-title">Chi tiết đoạn văn</span>
					</div>
				</Menu.Item>)
			}
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
