

import axiosClient from "./axiosClient";

const BASE_URL ="/api/articles";

const vocabularyCategoryApi = {
	fetchData: (params) => {
        const url = `${BASE_URL}/getAll`;
		return axiosClient.get(url, { params });
	},
	insert: (Data) => {
		return axiosClient.post(BASE_URL, Data);
	},

	delete: (id) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.delete(url);
	},

	update: (id, Data) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.patch(url, Data);
	},
};

export default vocabularyCategoryApi;
