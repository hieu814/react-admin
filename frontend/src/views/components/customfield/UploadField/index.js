import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography, Upload } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import commonFuc from "src/utils/commonFuc";

const { Text } = Typography;
let isUploadFile = true;

function UploadField(props) {
	const { title, titleCol, inputCol, isRequire, fileType, field } = props;
	const { name, value } = field;
	const [fileList, setFileList] = useState([]);

	const handleChange = async (info) => {
		if (isUploadFile) {
			const { file, fileList } = info;

			if (!file.url && !file.preview) {
				file.preview = await commonFuc.getBase64(file.originFileObj);
			}
			// console.log({ info });
			const lastItem = fileList.length - 1;
			setFileList([{ ...fileList[lastItem], status: "done" }]);
		}
	};

	const handleAction = (file) => {
		const formData = new FormData();
		formData.append(name, file);

		const changeEvent = {
			target: {
				name: name,
				value: formData,
			},
		};

		// console.log({ formData });
		field.onChange(changeEvent);
		isUploadFile = true;
	};

	const handleRemoveFile = () => {
		const changeEvent = {
			target: {
				name: name,
				value: null,
			},
		};
		field.onChange(changeEvent);
		setFileList([]);
		isUploadFile = false;
	};

	useEffect(() => {
		if (value && typeof value === "string") {
			const splitted = value.split("/");
			const lastItem = splitted.length - 1;
			const name = splitted[lastItem];
			setFileList([{ name }]);
		}
	}, []);

	return (
		<Row>
			<Col span={titleCol}>
				<Text strong>
					{title} {isRequire && <Text type="danger">*</Text>}
				</Text>
			</Col>

			<Col span={inputCol}>
				<Upload
					accept={fileType}
					action={handleAction}
					fileList={fileList}
					onChange={handleChange}
					onRemove={handleRemoveFile}
				>
					<Button icon={<PlusOutlined />}>Upload</Button>
				</Upload>
			</Col>
		</Row>
	);
}

UploadField.propTypes = {
	title: PropTypes.string,
	titleCol: PropTypes.number,
	inputCol: PropTypes.number,
	isRequire: PropTypes.bool,
	fileType: PropTypes.string,
};

UploadField.defaultProps = {
	title: "",
	titleCol: 24,
	inputCol: 24,
	isRequire: false,
	fileType: "",
};

export default UploadField;
