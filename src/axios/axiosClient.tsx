import axios from "axios";

const axiosClient = axios.create({
	//baseURL: "/api",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json; charset=UTF-8",
		accept: "text/plain",
	},
});

axiosClient.defaults.withCredentials = true;

export default axiosClient;
