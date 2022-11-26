import { Image, Table } from "antd";
import Column from "antd/lib/table/Column";
import PropTypes from "prop-types";
import React from "react";
import QuestionAction from "../QuestionAction";
import DataTable from 'react-data-table-component';
import imageNotFound from "src/assets/images/image-not-found.svg";
import {
	CButton,
} from '@coreui/react'
function QuestionTable(props) {
	const { setInitialValue, setIsModalVisible, questions, setIsDetailViewMode } = props;
	const columns_listening = [
		{
			name: 'Câu hỏi',
			selector: row => row.group,
			cell: (row, index, column, id) => {
				if (row.group.from === row.group.to) {
					return (<>{`Question ${row.group.from}`}</>);
				}
				return (<>{`Question ${row.group.from} - ${row.group.to}`}</>);
			}
		},
		{
			name: 'Hình ảnh',
			selector: row => row.image,
			cell: (row, index, column, id) => {
				return (
					<Image
						width={120}
						src={row.image}
						height={80}
						fallback={imageNotFound}
						style={{
							objectFit: "cover",
							backgroundPosition: "center center",
						}}
					/>
				);
			}
		},
		{
			name: '',
			button: true,
			allowOverflow: true,
			ignoreRowClick: true,
			cell: (row, index, column, id) => (
				<QuestionAction
					question={row}
					setInitialValue={setInitialValue}
					setIsModalVisible={setIsModalVisible}
				/>
			)
		}
	];

	const columns_reading = [
		{
			name: 'Câu hỏi',
			selector: row => row.group,
			cell: (row, index, column, id) => {
				if (row.group.from === row.group.to) {
					return (<>{`Question ${row.group.from}`}</>);
				}
				return (<>{`Question ${row.group.from} - ${row.group.to}`}</>);
			}
		},
		{
			name: '',
			button: true,
			allowOverflow: true,
			ignoreRowClick: true,
			cell: (row, index, column, id) => (
				<QuestionAction
					question={row}
					setInitialValue={setInitialValue}
					setIsModalVisible={setIsModalVisible}
				/>
			)
		}
	];
	return (
		<DataTable

			columns={[1, 2, 3, 4].includes(props.part) ? columns_listening : columns_reading}
			data={(questions)}
			pagination={true}
		/>
	);
}

QuestionTable.propTypes = {
	questions: PropTypes.array,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsDetailViewMode: PropTypes.func,
};

QuestionTable.defaultProps = {
	questions: [],
	setInitialValue: null,
	setIsModalVisible: null,
	setIsDetailViewMode: null,
};

export default QuestionTable;
