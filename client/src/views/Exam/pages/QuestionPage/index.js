import { Divider } from "antd";
import Title from "antd/lib/typography/Title";
import Page404 from 'src/views/pages/page404/Page404';
import QuestionDetailModal from "src/views/Exam/components/QuestionDetailModal";
import QuestionModal from "src/views/Exam/components/QuestionModal";
import QuestionTable from "src/views/Exam/components/QuestionTable";
import { fetchQuestions } from "src/stores/exam/examSlice";
import { useQuery } from "src/views/Exam/hooks";
import { questionValues } from "src/views/Exam/initialAndValidateValues";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CRow,
	CButton,
	CForm,
	CFormInput,
	CFormSelect
} from '@coreui/react'
QuestionPage.propTypes = {};

function QuestionPage(props) {
	const query = useQuery();
	const examId = query.get("examId");
	const type = +query.get("part");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { questions } = useSelector((state) => state.exam);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [initialValue, setInitialValue] = useState(questionValues.initial);



	useEffect(() => {
		console.log("-------- QuestionPage useEffect examId ", examId, " - ", type)
		dispatch(fetchQuestions({ examID: examId, part: type }));
		console.log({questions})
		// if (questionId) {

		// } else {
		// 	if (typeof examId === "string" && typeof type === "number") {
		// 		if (type < 1) {
		// 			navigate(`/exams/questions?examId=${examId}&part=1`);
		// 			dispatch(fetchQuestions({ examID: examId, part: type }));
		// 		} else if (type > 7) {
		// 			navigate(`/exams/paragraphs?examId=${examId}&part=7`);
		// 		} else {
		// 			if ([1, 2, 5].includes(type)) {

		// 				dispatch(fetchQuestions({ examID: examId, part: type }));
		// 			} else {
		// 				navigate(
		// 					`/exams/paragraphs?examId=${examId}&part=${type}`
		// 				);
		// 			}
		// 		}
		// 	}
		// }
	}, []);

	return examId && type ? (
		<div>
			<CRow>
				<CCol xs={12}>
					<Divider orientation="left">
						<Title level={3}>{`Part ${query.get("part")}`}</Title>
					</Divider>
					<CButton
						color={"primary"}

						onClick={() => setIsModalVisible(true)}
					>
						{"Thêm"}
					</CButton>

				</CCol>
				<CCol xs={12}>
					<CCard className="mb-4">
						<CCardHeader>

						</CCardHeader>
						<CCardBody>
							<QuestionTable
								questions={
									questions
								}
								part={type}
								setInitialValue={setInitialValue}
								setIsModalVisible={setIsModalVisible}
							/>

							{isModalVisible && (
								<QuestionModal
									title={`Part ${query.get("part")}`}
									isModalVisible={isModalVisible}
									setIsModalVisible={setIsModalVisible}
									initialValue={initialValue}
								/>
							)}

							{/* {isDetailViewMode && (
								<QuestionDetailModal
									isDetailViewMode={isDetailViewMode}
									setIsDetailViewMode={setIsDetailViewMode}
									question={initialValue}
								/>
							)} */}
						</CCardBody>
					</CCard>

				</CCol>
			</CRow>



		</div>
	) : (
		<h1>{type}</h1>
	);
}

export default QuestionPage;
