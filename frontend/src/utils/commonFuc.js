const commonFuc = {
	addSTTForList: (arr, start) => {
		if (!arr) return [];
		return arr.map((ele, index) => ({ stt: index + 1 + start, ...ele }));
	},

	getBase64: (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	},
	groupQuestionToQuestion(group) {
		try {
			let _question = group.questions[0]
			_question.image = group.image
			_question.audio = group.audio
			return _question
		} catch (error) {

		}
		return {
			_id: "",
			question: "",
			a: "",
			b: "",
			c: "",
			d: "",
			correct: "",
			image: null,
			audio: null,
		}
	}
};

export default commonFuc;
