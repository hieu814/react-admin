import { Col, Row, Select, Tag, Typography } from "antd";
import TagCustom from "src/views/components/TagCustom";
import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";

const { Text } = Typography;

const { Option } = Select;

SelectedField.propTypes = {
	title: PropTypes.string,
	options: PropTypes.array,
	isRequire: PropTypes.bool,
	titleCol: PropTypes.number,
	inputCol: PropTypes.number,
};

SelectedField.defaultProps = {
	title: "",
	options: [],
	isRequire: false,
	titleCol: 24,
	inputCol: 24,
};

function SelectedField({
	field,
	title,
	options,
	isRequire,
	titleCol,
	inputCol,
}) {
	const { name, value } = field;

	const handleChange = (value) => {
		const changeEvent = {
			target: {
				name: name,
				value: value,
			},
		};

		field.onChange(changeEvent);
	};

	return (
		<Row>
			<Col>

			</Col>
			<Col span={titleCol}>
				<Text strong>
					{title} {isRequire && <Text type="danger">*</Text>}
				</Text>

			</Col>
			<Col span={inputCol}>
				<Select
					dropdownStyle={{ zIndex: 2000 }}
					defaultValue={""}
					value={value}
					onChange={handleChange}
					style={{ width: "100%" }}
				>
					<Option value={""}>-- Chọn --</Option>
					{options.map((s, index) => (
						<Option key={index + 1} value={s.key}>
							{s.value}
						</Option>
					))}
				</Select>

				<ErrorMessage name={name}>
					{(text) => <TagCustom title={text} color="error" />}
				</ErrorMessage>
			</Col>
		</Row>
	);
}

export default SelectedField;
