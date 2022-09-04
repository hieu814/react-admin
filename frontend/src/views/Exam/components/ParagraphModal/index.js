import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Space, Spin } from "antd";
// import { paragraphApi } from "api";
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,

} from '@coreui/react'
import { EditorField, ImageField, InputField, UploadField } from "src/views/components/customfield";
import { fetchQuestions } from "src/stores/exam/examSlice";
import { useQuery } from "src/views/Exam/hooks";
import { paragraphValues } from "src/views/Exam/initialAndValidateValues";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";

function ParagraphModal(props) {
	const { isModalVisible, setIsModalVisible, initialValue } = props;

	const query = useQuery();
	const examId = query.get("examId");
	const part = +query.get("part");

	const dispatch = useDispatch();

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSubmit = async (values) => {
		console.log(initialValue);
		const { id, content, transcript, image } = values;
		let paragraph = { content, transcript };

		if (part === 3 || part === 4) {
			paragraph = { transcript, content: "null" };
			delete paragraph.audio;
		}

		const response =""// await paragraphApi.updateParagraph(id, paragraph);

		if (response.error) {
			const error = response.error;
			for (const property in error) {
				message.error(error[property]);
			}
		} else {
			// if (image && typeof image === "object")
				// await paragraphApi.updateParagraphImage(id, image);

			if (part === 3 || part === 4) {
				// if (content && typeof content === "object")
					// await paragraphApi.updateParagraphAudio(id, content);
			}

			message.success("Cập nhật thành công");
			handleCancel();
		}
		dispatch(fetchQuestions({ examId, type: part }));
	};

	return (
		<CModal size="xl" alignment="center" visible={isModalVisible} onClose={() => handleCancel()}>
		<CModalHeader>
			<CModalTitle>Modal title</CModalTitle>
		</CModalHeader>
		<CModalBody>
		<Formik
					initialValues={initialValue}
					validationSchema={paragraphValues.validationSchema}
					onSubmit={handleSubmit}
					enableReinitialize
				>
					{(formikProps) => {
						const { values, errors, touched, isSubmitting } = formikProps;
						return (
							<Form>
								<Space
									direction="vertical"
									size="middle"
									style={{ width: "100%" }}
								>
									<FastField component={InputField} name="id" type="hidden" />

									{[3, 4].includes(part) ? (
										<FastField
											name="content"
											component={UploadField}
											title="Audio"
											titleCol={6}
											inputCol={18}
											fileType="audio/*"
											isRequire={true}
										/>
									) : (
										<FastField
											name="content"
											component={EditorField}
											title="Nội dung"
											titleCol={6}
											maxLength={200}
											inputCol={18}
											isRequire={true}
										/>
									)}

									<FastField
										name="transcript"
										component={EditorField}
										title="Bản dịch"
										titleCol={6}
										maxLength={200}
										inputCol={18}
									/>

									<FastField
										name="image"
										component={ImageField}
										title="Hình ảnh"
										titleCol={6}
										maxLength={200}
										inputCol={18}
									/>
								</Space>
								<Row justify="end" style={{ marginTop: "20px" }}>
									<Col>
										<Space size="middle">
											<Button onClick={handleCancel}>Hủy</Button>

											<Button htmlType="submit" type="primary">

												Lưu
											</Button>
										</Space>
									</Col>
								</Row>
							</Form>
						);
					}}
				</Formik>

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
ParagraphModal.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	initialValue: PropTypes.object,
};

ParagraphModal.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	initialValue: paragraphValues.initial,
};
export default ParagraphModal;
