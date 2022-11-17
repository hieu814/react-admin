import axiosClient from './axiosClient'

const authApi = {
	login: (body) => {
		const url = '/api/auth/login'
		return axiosClient.post(url, body)
	},
	googleLogin: () => {
		const url = '/api/auth/google'
		return axiosClient.get(url)
	},
	register: (body) => {
		const url = '/api/auth/register'
		return axiosClient.post(url, body)
	},

    profile: () => {
		const url = `/api/auth/profile`
		return axiosClient.get(url)
	}
}

export default authApi
