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
import { ImageField, InputField, TextAreaField } from "src/views/components/customfield";
import { fetchQuestionDetail } from "src/stores/exam/examSlice";
import { useQuery } from "src/views/Exam/hooks";
import { questionValues } from "src/views/Exam/initialAndValidateValues";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import questionApi from "src/api/questionApi"
import upload from "src/api/uploadAPI"
function ParagraphModal(props) {
	const { isModalVisible, setIsModalVisible, initialValue, setInitialValue } = props;

	const query = useQuery();
	const questionId = query.get("questionId");

	const dispatch = useDispatch();

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleSubmit = async (values) => {
		let passage = { ...values };
		if (passage.image && passage.image != initialValue.image) {
			const res = await upload.updateImage(passage.image)
			passage.image = res.url
			console.log("upload new file ", res.url);
		} else {
			passage.image = initialValue.image
		}
		// upload.updateImage
		const response = await questionApi.updateGroupQuestion(questionId, { passage: passage });

		if (response.error) {
			const error = response.error;
			for (const property in error) {
				message.error(error[property]);
			}
		} else {
			message.success("Cập nhật thành công");
			handleCancel();
		}
		dispatch(fetchQuestionDetail(questionId));
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
										name="content"
										component={TextAreaField}
										title="Đoạn Văn"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
									/>

									<FastField
										name="image"
										component={ImageField}
										title="Hình ảnh"
										titleCol={6}
										maxLength={200}
										inputCol={18}
										isRequire={true}
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
ParagraphModal.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	initialValue: PropTypes.object,
};

ParagraphModal.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	initialValue: questionValues.initial,
};
export default ParagraphModal;
