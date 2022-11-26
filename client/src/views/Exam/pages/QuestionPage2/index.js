import { Divider } from "antd";
import Title from "antd/lib/typography/Title";
import Page404 from 'src/views/pages/page404/Page404';
import QuestionDetailModal from "src/views/Exam/components/QuestionDetailModal";
import QuestionModal from "src/views/Exam/components/QuestionModal2";
import QuestionTable from "src/views/Exam/components/QuestionTable2";
import { fetchQuestionDetail } from "src/stores/exam/examSlice";
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
} from '@coreui/react'
QuestionDetailPage.propTypes = {};

function QuestionDetailPage(props) {
	const query = useQuery();
	const questionId = query.get("questionId");
	const dispatch = useDispatch()
	const { question } = useSelector((state) => state.exam);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [initialValue, setInitialValue] = useState(questionValues.initial);

	useEffect(() => {	
		dispatch(fetchQuestionDetail(questionId)); 
	}, []);

	return questionId ? (
		<div>
			<CRow>
				<CCol xs={12}>
					<CCard className="mb-4">
						<CCardBody>
							<QuestionTable
								questions={
									 question?.questions || []
								}
								title = {`Question ${question.group.from}-${question.group.to}`}
								part={question?.type}
								setInitialValue={setInitialValue}
								setIsModalVisible={setIsModalVisible}
							/>
							{isModalVisible && (
								<QuestionModal
									// title={`Part ${query.get("part")}`}
									isModalVisible={isModalVisible}
									setIsModalVisible={setIsModalVisible}
									initialValue={initialValue}
								/>
							)}
						</CCardBody>
					</CCard>

				</CCol>
			</CRow>



		</div>
	) : (
		<h1>{"questionId"}</h1>
	);
}

export default QuestionDetailPage;
