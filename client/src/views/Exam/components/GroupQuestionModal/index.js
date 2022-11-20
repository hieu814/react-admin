import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Space, Spin } from "antd";
import {
	CButton,
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader,
	CModalTitle,

} from '@coreui/react'
// import { questionApi } from "api";
import { ImageField, InputField, UploadField } from "src/views/components/customfield";
import { fetchQuestions } from "src/stores/exam/examSlice";
import { useQuery } from "src/views/Exam/hooks";
import { groupQuestionValues, questionValues } from "src/views/Exam/initialAndValidateValues";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";

function QuestionModal(props) {
	const { isModalVisible, setIsModalVisible, initialValue } = props;

	const query = useQuery();
	const examId = query.get("examId");
	const part = +query.get("part");

	const dispatch = useDispatch();

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSubmit = async (values) => {
		const { id, content, audio = "" } = values;
		let question = { ...values };

		// if (part === 1) {
		// 	question = { ...values, content: "null" };
		// }

		// if (part === 1 || part === 2) delete question.audio;

		// const response = await questionApi.updateQuestion(id, question);

		// if (response.error) {
		// 	const error = response.error;
		// 	for (const property in error) {
		// 		message.error(error[property]);
		// 	}
		// } else {
		// 	if (part === 1) {
		// 		if (content && typeof content === "object")
		// 			await questionApi.updateQuestionImage(id, content);
		// 	}
		// 	if (part === 1 || part === 2) {
		// 		if (audio && typeof audio === "object")
		// 			await questionApi.updateQuestionAudio(id, audio);
		// 	}

		// 	message.success("Cập nhật thành công");
		// 	handleCancel();
		// }
		// dispatch(fetchQuestions({ examId, type: part }));
	};

	return (
		<CModal size="xl" alignment="center" visible={isModalVisible} onClose={() => handleCancel()}>
			<CModalHeader>
				<CModalTitle>Thao tác</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<Formik
					initialValues={initialValue}
					validationSchema={groupQuestionValues.validationSchema}
					onSubmit={handleSubmit}
					enableReinitialize
				>
					{(formikProps) => {
						const { values, errors, touched, isSubmitting } = formikProps;
						return (
							<Form id="form">
								<Space
									direction="vertical"
									size="middle"
									style={{ width: "100%" }}
								>
									<FastField component={InputField} name="id" type="hidden" />
									<FastField
										name="from"
										component={InputField}
										type="number"
										title="from"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>

									<FastField
										name="to"
										component={InputField}
										type="number"
										title="to"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>

									{[3, 4].includes(part) && (
										<FastField
											name="audio"
											component={UploadField}
											title="Audio"
											titleCol={6}
											inputCol={18}
											fileType="audio/*"
										/>
									)}

									{[3, 4].includes(part) && (
										<FastField
											name="image"
											component={ImageField}
											title="Hình ảnh"
											titleCol={6}
											maxLength={200}
											inputCol={18}
											isRequire={true}
										/>
									)}
								</Space>
							</Form>
						);
					}}
				</Formik>

			</CModalBody>
			<CModalFooter>
				<CButton color="secondary" onClick={() => handleCancel()}>
					Close
				</CButton>
				<CButton color="primary" type="submit" form='form'>
					Lưu
				</CButton>
			</CModalFooter>
		</CModal>

	);
}
QuestionModal.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	initialValue: PropTypes.object,
};

QuestionModal.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	initialValue: questionValues.initial,
};
export default QuestionModal;
