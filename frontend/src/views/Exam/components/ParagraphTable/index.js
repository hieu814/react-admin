import { Image, Table } from "antd";
import Column from "antd/lib/table/Column";
import PropTypes from "prop-types";
import React from "react";
import ParagraphAction from "../ParagraphAction";

function ParagraphTable(props) {
	const {
		setInitialValue,
		setIsModalVisible,
		paragraphs,
		part,
		examId,
		setIsDetailViewMode,
	} = props;

	return (
		<Table
			dataSource={paragraphs}
			pagination={false}
			scroll={{ y: 420 }}
			style={{ height: "490px" }}
		>
			<Column
				align="center"
				width="60px"
				title="STT"
				key="stt"
				render={(_, __, index) => <>{index + 1}</>}
			/>
			<Column
				title="Đoạn văn"
				dataIndex="paragraph"
				key="paragraph"
				render={(_, record, index) => {
					const paragraph = record.paragraph;
					const isAudio = paragraph?.startsWith("http");
					return paragraph?.length > 0 ? (
						isAudio ? (
							<audio controls>
								<source src={paragraph} />
							</audio>
						) : (
							<>{`Đoạn ${index + 1}`}</>
						)
					) : (
						""
					);
				}}
			/>
			<Column
				title="Hình ảnh"
				dataIndex="image"
				key="image"
				align="center"
				render={(_, record) => (
					<Image
						width={120}
						src={record.image} // ? record.image : imageNotFound
						height={80}
						// fallback={imageNotFound}
						style={{ objectFit: "cover", backgroundPosition: "center center" }}
					/>
				)}
			/>
			<Column
				key="action"
				align="center"
				render={(_, record, index) => {
					return (
						<ParagraphAction
							paragraph={record}
							setInitialValue={setInitialValue}
							setIsModalVisible={setIsModalVisible}
							part={part}
							examId={examId}
							setIsDetailViewMode={setIsDetailViewMode}
						/>
					);
				}}
			/>
		</Table>
	);
}

ParagraphTable.propTypes = {
	paragraphs: PropTypes.array,
	setInitialValue: PropTypes.func,
	setIsModalVisible: PropTypes.func,
	setIsDetailViewMode: PropTypes.func,
	part: PropTypes.number,
	examId: PropTypes.number,
};

ParagraphTable.defaultProps = {
	paragraphs: [],
	setInitialValue: null,
	setIsModalVisible: null,
	setIsDetailViewMode: null,
	part: 3,
	examId: 0,
};

export default ParagraphTable;
