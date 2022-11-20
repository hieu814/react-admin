import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Divider, Image } from "antd";
import Modal from "antd/lib/modal/Modal";
import {
    CCol,
    CRow,
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CFormLabel,

} from '@coreui/react'
import { paragraphValues } from "src/views/Exam/initialAndValidateValues";
import PropTypes from "prop-types";
import React from "react";
import Parser from "html-react-parser";
import Title from "antd/lib/typography/Title";

function ParagraphDetailModal(props) {
	const { isDetailViewMode, setIsDetailViewMode, paragraph } = props;
	const handleCancel = () => {
		setIsDetailViewMode(false);
	};
	return (
		<CModal size="xl" alignment="center" visible={isDetailViewMode} onClose={() => handleCancel()}>
		<CModalHeader>
			<CModalTitle>Thao tác</CModalTitle>
		</CModalHeader>
		<CModalBody>
			
		<Divider>
				<Title level={3}>Đoạn văn</Title>
			</Divider>
			<div>
				{paragraph.paragraph.startsWith("http") ? (
					<audio controls>
						<source src={paragraph.paragraph} />
					</audio>
				) : (
					paragraph?.paragraph && Parser(paragraph.paragraph)
				)}
			</div>
			<Divider>
				<Title level={3}>Bản dịch</Title>
			</Divider>
			<div>{paragraph?.transcript && Parser(paragraph.transcript)}</div>
			<Divider>
				<Title level={3}>Hình ảnh</Title>
			</Divider>
			<Image width={200} src={paragraph.image} />
		</CModalBody>
		<CModalFooter>
			<CButton color="secondary" onClick={() => handleCancel()}>
				Close
			</CButton>
			<CButton color="primary" type="submit" form='my-form'>

				Lưu
			</CButton>
		</CModalFooter>
	</CModal>

	);
}

ParagraphDetailModal.propTypes = {
	isDetailViewMode: PropTypes.bool,
	setIsDetailViewMode: PropTypes.func,
	paragraph: PropTypes.object,
};

ParagraphDetailModal.defaultProps = {
	isDetailViewMode: false,
	setIsDetailViewMode: null,
	paragraph: paragraphValues.initial,
};
export default ParagraphDetailModal;
