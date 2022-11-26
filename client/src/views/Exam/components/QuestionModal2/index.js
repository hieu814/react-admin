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
import { ImageField, InputField, UploadField } from "src/views/components/customfield";
import { fetchQuestions } from "src/stores/exam/examSlice";
import { useQuery } from "src/views/Exam/hooks";
import { questionValues } from "src/views/Exam/initialAndValidateValues";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import questionApi from "src/api/questionApi"
function QuestionModal(props) {
	const { isModalVisible, setIsModalVisible, initialValue, setInitialValue } = props;

	const query = useQuery();
	const questionId = query.get("questionId");

	const dispatch = useDispatch();

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSubmit = async (values) => {
		let question = { ...values };

		const response = await questionApi.updateQuestion(questionId, question);
		console.log({ response })
		if (response.error) {
			const error = response.error;
			for (const property in error) {
				message.error(error[property]);
			}
		} else {
			message.success("Cập nhật thành công");
			handleCancel();
		}
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
					validationSchema={questionValues.validationSchema}
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
									<FastField component={InputField} name="_id" type="hidden" />
									<FastField
										name="question"
										component={InputField}
										title="Câu hỏi"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>

									<FastField
										name="A"
										component={InputField}
										title="A"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>
									<FastField
										name="B"
										component={InputField}
										title="B"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>
									<FastField
										name="C"
										component={InputField}
										title="C"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>
									<FastField
										name="D"
										component={InputField}
										title="D"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>
									<FastField
										name="corectanswer"
										component={InputField}
										title="Đáp án"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>
									<FastField
										name="transcript"
										component={InputField}
										title="Giải thích"
										titleCol={6}
										maxLength={200}
										inputCol={18}
									/>
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
