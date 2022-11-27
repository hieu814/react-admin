
import PropTypes from "prop-types";
import React from "react";
import DataTable from 'react-data-table-component';
import { Image } from "antd";
import imageNotFound from "src/assets/images/image-not-found.svg";
import {
	CButton,
} from '@coreui/react'
function ParagraphTable(props) {
	const { setIsModalVisible, questions, setInitialValue } = props;
	const columns = [
		{
			name: 'STT',
			selector: row => row.number,
			cell: (row, index, column, id) => {
				return <>{row?.number}</>
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
			name: 'Đoạn văn',
			selector: row => row.content,
			cell: (row, index, column, id) => {
				return <>{row?.content}</>
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

					onClick={() => {
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
			title={props.title || ""}
			columns={columns}
			data={questions}
			pagination={true}
		/>
	);
}

ParagraphTable.propTypes = {
	questions: PropTypes.array,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsDetailViewMode: PropTypes.func,
};

ParagraphTable.defaultProps = {
	questions: [],
	setInitialValue: null,
	setIsModalVisible: null,
	setIsDetailViewMode: null,
};

export default ParagraphTable;
