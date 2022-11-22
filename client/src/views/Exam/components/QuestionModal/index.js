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
		console.log("question: ", initialValue)
		if (part === 1) {
			question = { ...values};
		}

		if (part === 1 || part === 2) delete question.audio;

		const response = await questionApi.update(id, question);

		if (response.error) {
			const error = response.error;
			for (const property in error) {
				message.error(error[property]);
			}
		} else {
			if (part === 1) {
				if (content && typeof content === "object")
					await questionApi.updateImage(id, content);
			}
			if (part === 1 || part === 2) {
				if (audio && typeof audio === "object")
					await questionApi.updateAudio(id, audio);
			}

			message.success("Cập nhật thành công");
			handleCancel();
		}
		dispatch(fetchQuestions({ examId, type: part }));
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
									{part > 1 && (
										<FastField
											name="question"
											component={InputField}
											title="Câu hỏi"
											titleCol={6}
											maxLength={200}
											inputCol={18}
											isRequire={true}
										/>
									)}

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
										name="correct"
										component={InputField}
										title="Đáp án"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>
									{/* {part > 1 (<FastField
										name="transcript"
										component={InputField}
										title="Giải thích"
										titleCol={6}
										maxLength={200}
										inputCol={18}
									/>)} */}

									{[1, 2, 3, 4].includes(part) && (
										<FastField
											name="audio"
											component={UploadField}
											title="Audio"
											titleCol={6}
											inputCol={18}
											fileType="audio/*"
										/>
									)}

									{part === 1 && (
										<FastField
											name="content"
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
