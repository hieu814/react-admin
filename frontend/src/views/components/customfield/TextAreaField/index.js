import React from "react";
import PropTypes from "prop-types";
import { Col, Input, Row, Tag, Typography } from "antd";
import { ErrorMessage } from "formik";
import TagCustom from "src/views/components/TagCustom";
import TextArea from "antd/lib/input/TextArea";

const { Text } = Typography;

TextAreaField.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	maxLength: PropTypes.number,
	isRequire: PropTypes.bool,
	disabled: PropTypes.bool,
	titleCol: PropTypes.number,
	inputCol: PropTypes.number,
	size: PropTypes.string,
	showCount: PropTypes.bool,
	rows: PropTypes.number,
};

TextAreaField.defaultProps = {
	title: "",
	type: "text",
	placeholder: "",
	maxLength: 50,
	isRequire: false,
	disabled: false,
	titleCol: 24,
	inputCol: 24,
	size: "middle",
	showCount: true,
	rows: 3,
};

function TextAreaField(props) {
	const {
		field,
		title,
		type,
		placeholder,
		maxLength,
		disabled,
		isRequire = false,
		titleCol = 8,
		inputCol = 16,
		size,
		showCount,
		rows,
	} = props;
	const { name } = field;

	return (
		<Row>
			<Col span={titleCol}>
				<Text strong>
					{title}

					{isRequire && <Text type="danger"> *</Text>}
				</Text>
			</Col>
			<Col span={inputCol}>
				<TextArea
					{...field}
					type={type}
					maxLength={maxLength}
					placeholder={placeholder}
					disabled={disabled}
					showCount={showCount}
					size={size}
					rows={rows}
				/>
				<ErrorMessage name={name}>
					{(text) => <TagCustom title={text} color="error" />}
				</ErrorMessage>
			</Col>
		</Row>
	);
}

export default TextAreaField;
