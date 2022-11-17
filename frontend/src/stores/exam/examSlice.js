import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import examApi from "src/api/examApi";
import questionApi from "src/api/questionApi";
import examCategoryApi from "src/api/examCategoryApi";
const KEY = "exam";

export const fetchCategories = createAsyncThunk(`${KEY}/fetchCategories`, async () => {
	const data = await examCategoryApi.fetchData({ skip: 0, limit: 100});
	return data.data;
});

export const fetchExams = createAsyncThunk(
	`${KEY}/fetchExams`,
	async (params, thunkApi) => {
		const data = await examApi.fetchData(params);
		return data;
	}
);

export const deleteExam = createAsyncThunk(
	`${KEY}/deleteExam`,
	async (params, thunkApi) => {
		const { examId } = params;
		await examApi.delete(examId);
		return examId;
	}
);

export const fetchQuestions = createAsyncThunk(
	`${KEY}/fetchQuestions`,
	async (params, thunkApi) => {
		const data = await questionApi.fetchData(params);
		return data.data;
	}
);

const examSlice = createSlice({
	name: KEY,
	initialState: {
		isLoading: false,
		examsPage: {},
		questions: [],
		categories: [],
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: {
		[fetchExams.pending]: (state, action) => {
			state.isLoading = true;
		},

		[fetchExams.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.examsPage = action.payload;
		},
		[fetchQuestions.pending]: (state, action) => {
			state.isLoading = true;
		},

		[fetchQuestions.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.questions = action.payload;
		},
		[fetchCategories.pending]: (state, action) => {
			state.isLoading = true;
		},

		[fetchCategories.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.categories = action.payload;
		},
		[deleteExam.pending]: (state, action) => {
			state.isLoading = true;
		},

		[deleteExam.fulfilled]: (state, action) => {
			state.isLoading = false;
		},
	},
});

const { reducer, actions } = examSlice;
export const { setLoading } = actions;
export default reducer;
