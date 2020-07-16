export const checkStatus = (res) => {
	if (res.status >= 200 && res.status < 300) {
		return res.json();
	}
	else {
		let err = new Error(res.statusText);
		err.response = res;
		throw err;
	}
}