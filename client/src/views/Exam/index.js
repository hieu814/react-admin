import { Spin } from "antd";
import Page404 from 'src/views/pages/page404/Page404';
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useMatch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ParagraphPage from "./pages/ParagraphPage";
import QuestionPage from "./pages/QuestionPage";

Exam.propTypes = {};

function Exam(props) {
	// const { url } = useMatch();
	// const { isLoading } = useSelector((state) => state.exam);

	return (
		<Routes>
			<Route exact path="*" element={<MainPage />} />
			{/* <Route exact path={url} component={ExamDetailPage} /> */}
			<Route exact path={`/questions`} name="Register áda" element={<QuestionPage />} />
			<Route exact path={`/paragraphs`} name="Register ádasd" element={<ParagraphPage />} />
			<Route
				exact
				path={`/paragraphs/questions`}
				element={<QuestionPage />}
			/>
			<Route element={<h1>ádasdasdsda</h1>} />
		</Routes>
	);
}

export default Exam;
