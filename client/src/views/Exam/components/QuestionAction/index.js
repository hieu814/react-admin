import { EditTwoTone, InfoCircleTwoTone } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import PropTypes from "prop-types";
import React from "react";

function QuestionAction(props) {
	const { setIsModalVisible } =
		props;

	const handleOnUpdateClick = () => {
		setIsModalVisible(true);
	};
	const handleDetailClick = () => {
		setIsModalVisible(true);
	};
	const handlePasageClick = () => {
		setIsModalVisible(true);
	};

	const menu = (
		<Menu>
			<Menu.Divider />
			<Menu.Item onClick={handleOnUpdateClick}>
				<div className="menu-adjust--center">
					<EditTwoTone twoToneColor="#ad8b00" />
					<span className="menu-title">Sửa</span>
				</div>
			</Menu.Item>
			<Menu.Divider />
			{
				props.question.type === 1 && props.question.type === 2 && props.question.type === 5 ?
					(<div>
						<Menu.Item onClick={handleDetailClick}>
							<div className="menu-adjust--center">
								<InfoCircleTwoTone />
								<span className="menu-title">Chi tiết câu hỏi</span>
							</div>
						</Menu.Item>
					</div>


					) : (<div></div>)
			}
			<Menu.Divider />
			{
				props.question.type === 6 && props.question.type === 7 ?
					(<Menu.Item onClick={handlePasageClick}>
						<div className="menu-adjust--center">
							<InfoCircleTwoTone />
							<span className="menu-title">Chi tiết đoạn văn</span>
						</div>
					</Menu.Item>) : (<div></div>)
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
