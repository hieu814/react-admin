import { Table } from "antd";
import Column from "antd/lib/table/Column";
import PropTypes from "prop-types";
import React from "react";
import ExamAction from "../ExamAction";
import DataTable from 'react-data-table-component';
function ExamTable(props) {
	const { changeRowPerPage, handlePageChange, setInitialValue, setIsModalVisible, setIsAddMode, exams, query } =
		props;
	const columns = [
		{
			name: 'STT',
			selector: row => row.stt,
			sortable: true
		},

		{
			name: 'Tên',
			selector: row => row.name,
			sortable: true
		},

		{
			name: '',
			button: true,
			allowOverflow: true,
			ignoreRowClick: true,
			cell: (row, index, column, id) => (
				<ExamAction
					exam={row}
					setInitialValue={setInitialValue}
					setIsModalVisible={setIsModalVisible}
					setIsAddMode={setIsAddMode}
					query={query}
				/>
			)
		}
	];
	return (
		<DataTable
		
		columns={columns}
		data={exams}
		onChangePage={(p) => handlePageChange(p)}
		pagination={true}
		paginationTotalRows={query.size}
		onChangeRowsPerPage={(r) => changeRowPerPage(r)}
		paginationServer={true}
		// progressPending={isloading}

	  />

	);
}

ExamTable.propTypes = {
	exams: PropTypes.array,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsAddMode: PropTypes.func,
	query: PropTypes.object,
};

ExamTable.defaultProps = {
	exams: [],
	setInitialValue: null,
	setIsModalVisible: null,
	setIsAddMode: null,
};

export default ExamTable;
