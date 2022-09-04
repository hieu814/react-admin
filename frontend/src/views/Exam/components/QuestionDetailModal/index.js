import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Image, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import {
	paragraphValues,
	questionValues,
} from "src/views/Exam/initialAndValidateValues";
import {

    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,


} from '@coreui/react'
import PropTypes from "prop-types";
import React from "react";
import Text from "antd/lib/typography/Text";

function QuestionDetailModal(props) {
	const { isDetailViewMode, setIsDetailViewMode, question } = props;
	const handleCancel = () => {
		setIsDetailViewMode(false);
	};
	return (
		<CModal size="xl" alignment="center" visible={isDetailViewMode} onClose={() => handleCancel()}>
		<CModalHeader>
			<CModalTitle>Modal title</CModalTitle>
		</CModalHeader>
		<CModalBody>
		<Space direction="vertical" style={{ width: "100%" }} size="large">
				<div>
					{question?.audio && (
						<audio controls>
							<source src={question.audio} />
						</audio>
					)}
				</div>
				{question.content.startsWith("http") ? (
					<Image width={200} src={question.content} />
				) : (
					<Text>{question.content}</Text>
				)}
				<Space direction="vertical" style={{ width: "100%" }} size="small">
					<Text>A. {question.a}</Text>
					<Text>B. {question.b}</Text>
					<Text>C. {question.c}</Text>
					<Text>{question?.d && `D. ${question.d}`}</Text>
				</Space>
				<Text>Đáp án: {question.result}</Text>
				<Text>Giải thích: {question.extra}</Text>
			</Space>

		</CModalBody>
		<CModalFooter>
			<CButton color="secondary" onClick={() => handleCancel()}>
				Close
			</CButton>
			<CButton color="primary" type="submit" form='my-form'>
				Save changes
			</CButton>
		</CModalFooter>
	</CModal>
		
	);
}

QuestionDetailModal.propTypes = {
	isDetailViewMode: PropTypes.bool,
	setIsDetailViewMode: PropTypes.func,
	question: PropTypes.object,
};

QuestionDetailModal.defaultProps = {
	isDetailViewMode: false,
	setIsDetailViewMode: null,
	question: questionValues.initial,
};
export default QuestionDetailModal;
