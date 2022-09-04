import * as Yup from "yup";

export const examValues = {
	initial: {
		_id: "",
		name: "",
		category: "",

	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required("Tên đề thi không được bỏ trống"),
		category: Yup.string().required( "Bộ đề không được bỏ trống"),
	}),
};

export const paragraphValues = {
	initial: {
		id: 0,
		content: "",
		transcript: "",
		image: null,
	},

	validationSchema: Yup.object().shape({
		// content: Yup.string().required("Nội dung không được bỏ trống"),
		// transcript: Yup.string().required("Bản dịch không được bỏ trống"),
	}),
};

export const questionValues = {
	initial: {
		id: 0,
		content: "",
		a: "",
		b: "",
		c: "",
		d: "",
		result: "",
		extra: "",
		image: null,
		audio: null,
	},

	validationSchema: Yup.object().shape({
		content: Yup.string().required("Câu hỏi không được bỏ trống"),
		a: Yup.string().required("Không được bỏ trống"),
		b: Yup.string().required("Không được bỏ trống"),
		c: Yup.string().required("Không được bỏ trống"),
		result: Yup.string().required("Đáp án không được bỏ trống"),
	}),
};
