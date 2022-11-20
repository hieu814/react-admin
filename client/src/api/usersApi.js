

import axiosClient from "./axiosClient";

const BASE_URL ="/api/users";

const userApi = {
	fetchUsers: (params) => {
        const url = `${BASE_URL}/getAll`;
		return axiosClient.get(url, { params });
	},


	addUser: (user) => {
		return axiosClient.post(BASE_URL, user);
	},

	deleteUser: (id) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.delete(url);
	},

	updateUser: (id, user) => {
		const url = `${BASE_URL}/${id}`;
		return axiosClient.patch(url, user);
	},
};

export default userApi;
