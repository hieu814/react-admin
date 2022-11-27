

import axiosClient from "./axiosClient";

const BASE_URL ="/api/questions";

const questionApi = {
	fetchData: (params) => {
        const url = `${BASE_URL}/getAll`;
		return axiosClient.get(url, { params });
	},
	insert: (Data) => {
		return axiosClient.post(BASE_URL, Data);
	},

	delete: (id,examID) => {
		const url = `${BASE_URL}/${id}/${examID}`;
		return axiosClient.delete(url);
	},
	get: (id) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.get(url);
	},
	update: (id, Data) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.patch(url, Data);
	},
	updateGroupQuestion: (id, Data) => {
		const url = `${BASE_URL}/updateGroupQuestion/${id}`;
		return axiosClient.patch(url, Data);
	},
	updateQuestion: (id, Data) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.patch(url, Data);
	},
	updateImage: (id, image) => {
		const url = `${BASE_URL}/updateImage/${id}`;
		return axiosClient.patch(url, image);
	},
	updateAudio: (id, audio) => {
		const url = `${BASE_URL}/updateAudio/${id}`;
		return axiosClient.patch(url, audio);
	},
};

export default questionApi;
