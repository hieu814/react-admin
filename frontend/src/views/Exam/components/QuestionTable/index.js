import { Image, Table } from "antd";
import Column from "antd/lib/table/Column";
import PropTypes from "prop-types";
import React from "react";
import QuestionAction from "../QuestionAction";
import DataTable from 'react-data-table-component';
import imageNotFound from "src/assets/images/image-not-found.svg";
function QuestionTable(props) {
	const { setInitialValue, setIsModalVisible, questions, setIsDetailViewMode } =
		props;
		const columns = [
			{
				name: 'STT',
				selector: row => row.stt,
				sortable: true
			},
			{
				name: 'Câu hỏi',
				selector: row => row.name,
				cell: (row, index, column, id) =>{
					return row.type === 1 ? (
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
					) : (
						<>{"content"}</>
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
					setIsDetailViewMode={setIsDetailViewMode}
				/>
				)
			}
		];
	return (
		<DataTable
		title="Quản lý bài học"
		columns={columns}
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
