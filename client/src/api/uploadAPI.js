

import axiosClient from "./axiosClient";

const BASE_URL = "/api/upload";

const upload = {
	updateImage: (image) => {
		const url = `${BASE_URL}/updateImage`;
		return axiosClient.post(url, image);
	},
	updateAudio: (audio) => {
		const url = `${BASE_URL}/updateAudio`;
		return axiosClient.post(url, audio);
	},
};

export default upload;
