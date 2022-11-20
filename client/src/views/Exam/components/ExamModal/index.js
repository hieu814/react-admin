import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Space, Spin } from "antd";
import examApi from "src/api/examApi";
import { InputField, SelectedField, UploadField } from "src/views/components/customfield";
import { fetchExams } from "src/stores/exam/examSlice";
import { examValues } from "src/views/Exam/initialAndValidateValues";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	CModal,
	CModalBody,
	CModalFooter,
	CModalHeader,
	CModalTitle,
	CCol,
	CRow,
	CButton,

} from '@coreui/react'
function ExamModal(props) {
	const { isModalVisible, setIsModalVisible, isAddMode, initialValue, query } =
		props;

	const dispatch = useDispatch();
	const { categories } = useSelector((state) => state.exam);

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const handleImportCsv = async (file, examId) => {
		await examApi.importCSV(examId, file);
	};

	const handleUpdateAudio = async (audios, examId) => {
		for (const property in audios) {
			const audio = audios[property];
			if (typeof audio !== "string") {
				// await examApi.updateExamAudio(examId, audio);
			}
		}
	};

	const handleSubmit = async (values) => {
		const { _id, audio, file } =
			values;
		const audios = {};
		console.log("handleSubmit")
		let response;

		if (isAddMode) {
			response = await examApi.insert(values);
		} else {
			response = await examApi.update(_id, values);
		}

		if (response.error) {
			const error = response.error;
			for (const property in error) {
				message.error(error[property]);
			}
		} else {
			const examId = isAddMode ? response._id : _id;
			// await handleUpdateAudio(audios, examId);
			if (file)
				await handleImportCsv(file, examId)
			message.success(`${isAddMode ? "Thêm" : "Cập nhật"} thành công`);
			handleCancel();
		}
		dispatch(fetchExams(query));
	};

	return (
		<CModal size="xl" alignment="center" visible={isModalVisible} onClose={() => handleCancel()}>
			<CModalHeader>
				<CModalTitle>Thao tác</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol>
						<Formik
							initialValues={initialValue}
							validationSchema={examValues.validationSchema}
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
												name="name"
												component={InputField}
												title="Tên đề thi"
												titleCol={6}
												maxLength={200}
												inputCol={18}
												isRequire={true}
											/>
											<FastField
												name="category"
												component={SelectedField}
												title="Bộ đề"
												options={categories.map((book) => ({
													key: book._id,
													value: book.name,
												}))}
												titleCol={6}
												inputCol={18}
												isRequire={true}
											/>
											{isAddMode ? (<p></p>) : (
												<FastField
													name="file"
													component={UploadField}
													title="Thêm câu hỏi từ CSV"
													titleCol={6}
													inputCol={18}
													fileType="csv"
												/>)}
										</Space>

									</Form>
								);
							}}
						</Formik>
					</CCol>
				</CRow>

			</CModalBody>
			<CModalFooter>
				<CButton color="secondary" onClick={() => setIsModalVisible(false)}>
					Close
				</CButton>
				<CButton color="primary" type="submit" form='form'>Lưu</CButton>
			</CModalFooter>
		</CModal>

	);
}
ExamModal.propTypes = {
	isModalVisible: PropTypes.bool,
	setIsModalVisible: PropTypes.func,
	isAddMode: PropTypes.bool,
	initialValue: PropTypes.object,
	query: PropTypes.object,
};

ExamModal.defaultProps = {
	isModalVisible: false,
	setIsModalVisible: null,
	isAddMode: true,
	initialValue: examValues.initial,
	query: {
		name: "",
		page: 0,
		size: 10,
	},
};
export default ExamModal;
