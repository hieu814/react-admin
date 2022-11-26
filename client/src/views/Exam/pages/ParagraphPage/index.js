import ParagraphModal from "src/views/Exam/components/ParagraphModal";
import ParagraphTable from "src/views/Exam/components/ParagraphTable";
import { fetchQuestionDetail } from "src/stores/exam/examSlice";
import { useQuery } from "src/views/Exam/hooks";
import { questionValues } from "src/views/Exam/initialAndValidateValues";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	CCard,
	CCardBody,
	CCol,
	CRow,
} from '@coreui/react'
ParagraphPage.propTypes = {};

function ParagraphPage(props) {
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
							<ParagraphTable
								questions={
									 question?.passages || []
								}
								// title = {`Question ${question?.group.from}-${question?.group.to}`}
								part={question?.type}
								setInitialValue={setInitialValue}
								setIsModalVisible={setIsModalVisible}
							/>
							{isModalVisible && (
								<ParagraphModal
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

export default ParagraphPage;
