import * as Yup from "yup";

export const examValues = {
	initial: {
		_id: "",
		name: "",
		category: "",

	},

	validationSchema: Yup.object().shape({
		name: Yup.string().required("Tên đề thi không được bỏ trống"),
		category: Yup.string().required("Bộ đề không được bỏ trống"),
	}),
};

export const paragraphValues = {
	initial: {
		_id: 0,
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
		_id: "",
		question: "",
		a: "",
		b: "",
		c: "",
		d: "",
		correct: "",
		image: null,
		audio: null,
	},

	val_idationSchema: Yup.object().shape({
		content: Yup.string().required("Câu hỏi không được bỏ trống"),
		a: Yup.string().required("Không được bỏ trống"),
		b: Yup.string().required("Không được bỏ trống"),
		c: Yup.string().required("Không được bỏ trống"),
		result: Yup.string().required("Đáp án không được bỏ trống"),
	}),
};
export const groupQuestionValues = {
	initial: {
		_id: "",
		from: 0,
		to: 0,
		image: null,
		audio: null,
	},

	validationSchema: Yup.object().shape({
		from: Yup.number()
			.positive("Không hợp lệ")
			.integer("Không hợp lệ")
			.min(1).max(200)
			.required('Không được để trống'),
		to: Yup.number()
			.positive("Không hợp lệ")
			.integer("Không hợp lệ")
			.min(1).max(200)
			.required('Không được để trống'),
	}),
};