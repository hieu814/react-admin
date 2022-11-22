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
	const { setIsModalVisible, questions,setInitialValue } = props;
	const columns_listening = [
		{
			name: 'Câu',
			selector: row => row.number,
			cell: (row, index, column, id) => {
				return <>{row?.number}</>
			}
		},
		{
			name: 'Câu hỏi',
			selector: row => row?.question,
			cell: (row, index, column, id) => {
				return <>{row?.question}</>
			}
		},
		{
			name: 'Đáp án',
			selector: row => row.corectanswer,
			cell: (row, index, column, id) => {
				return<>{row?.corectanswer}</>
			}
		},
		{
			name: '',
			button: true,
			allowOverflow: true,
			ignoreRowClick: true,
			cell: (row, index, column, id) => (
				<CButton
					color={"primary"}
					key={1}

					onClick={() =>{ 
						setInitialValue(row)
						setIsModalVisible(true)
					}}
				>
					{"Sửa"}
				</CButton>
			)
		}
	];

	return (
		<DataTable
			 title={JSON.stringify(questions[1])}
			columns={columns_listening}
			data={questions}
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
