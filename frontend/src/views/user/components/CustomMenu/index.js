import React from 'react'
import "antd/dist/antd.css";
import { Menu, Dropdown } from 'antd';
import SubMenu from "antd/lib/menu/SubMenu";
import {

	CButton

  } from '@coreui/react'
import {
	DeleteTwoTone,
	EditTwoTone,
	ExclamationCircleOutlined,
	InfoCircleTwoTone,
} from "@ant-design/icons";
export default function App() {
	const parts = [1, 2, 3, 4, 5, 6, 7];
	const handleOnDetailClick = (part) => {

	};

	const handleOnUpdateClick = () => {

	};

	const handleOnDeleteClick = async () => {

	};
	return (
		<Dropdown
			overlay={(
				<Menu>
					<Menu.Item>
						<SubMenu
							key="sub1"
							title={
								<>
									<InfoCircleTwoTone />
									<span className="menu-title"> Chi tiết</span>
								</>
							}
						>
							{parts.map((part) => (
								<Menu.Item onClick={() => handleOnDetailClick(part)}>
									<div className="menu-adjust--center">
										<InfoCircleTwoTone />
										<span className="menu-title">  Part {part}</span>
									</div>
								</Menu.Item>
							))}
						</SubMenu>
					</Menu.Item>

					<Menu.Divider />
					<Menu.Item onClick={handleOnUpdateClick}>
						<div className="menu-adjust--center">
							<EditTwoTone twoToneColor="#ad8b00" />
							<span className="menu-title"> Sửa</span>
						</div>
					</Menu.Item>

					<Menu.Divider />
					<Menu.Item onClick={handleOnDeleteClick}>
						<div className="menu-adjust--center">
							<DeleteTwoTone twoToneColor="#a8071a" />
							<span className="menu-title"> Xóa</span>
						</div>
					</Menu.Item>
				</Menu>
			)}
			trigger={['click']}>
			<CButton
				color={"primary"}
				onClick={e => e.preventDefault()}
			>
				{"Test"}
			</CButton>
		</Dropdown>
	);
}
