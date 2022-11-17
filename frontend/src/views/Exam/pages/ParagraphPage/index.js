import { Divider } from "antd";
import Title from "antd/lib/typography/Title";
import Page404 from'src/views/pages/page404/Page404';
import ParagraphDetailModal from "src/views/Exam/components/ParagraphDetailModal";
import ParagraphModal from "src/views/Exam/components/ParagraphModal";
import ParagraphTable from "src/views/Exam/components/ParagraphTable";
import QuestionModal from "src/views/Exam/components/QuestionModal";
import { fetchQuestions } from "src/stores/exam/examSlice";
import { useQuery } from "src/views/Exam/hooks";
import { paragraphValues } from "src/views/Exam/initialAndValidateValues";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

ParagraphPage.propTypes = {};

function ParagraphPage(props) {
	const query = useQuery();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { questions } = useSelector((state) => state.exam);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [initialValue, setInitialValue] = useState(paragraphValues.initial);
	const [isDetailViewMode, setIsDetailViewMode] = useState(false);

	const examId = +query.get("examId");
	const type = +query.get("part");

	useEffect(() => {
		if (typeof examId === "number" && typeof type === "number") {
			if (type < 1) {
				navigate(`/exams/questions?examId=${examId}&part=1`);
			} else if (type > 7) {
				navigate(`/admin/exams/paragraphs?examId=${examId}&part=7`);
				dispatch(fetchQuestions({ examId, type: 7 }));
			} else {
				if (![1, 2, 5].includes(type)) {
					dispatch(fetchQuestions({ examId, type }));
				} else {
					navigate(`/admin/exams/questions?examId=${examId}&part=${type}`);
				}
			}
		}
	}, []);
	return examId && type ? (
		<div>
			<Divider orientation="left">
				<Title level={3}>{`Part ${query.get("part")}`} ParagraphPage</Title>
			</Divider>
			<ParagraphTable
				paragraphs={questions}
				setInitialValue={setInitialValue}
				setIsModalVisible={setIsModalVisible}
				setIsDetailViewMode={setIsDetailViewMode}
				part={type}
				examId={examId}
			/>

			{isModalVisible && (
				<ParagraphModal
					isModalVisible={isModalVisible}
					setIsModalVisible={setIsModalVisible}
					initialValue={initialValue}
				/>
			)}

			{isDetailViewMode && (
				<ParagraphDetailModal
					isDetailViewMode={isDetailViewMode}
					setIsDetailViewMode={setIsDetailViewMode}
					paragraph={initialValue}
				/>
			)}
		</div>
	) : (
		<Page404 />
	);
}

export default ParagraphPage;
