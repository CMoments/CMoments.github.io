function login(url) {
	var token = sessionStorage.getItem("login-token");
	if (token) {
		return Promise.resolve(token);
	}

	return fetch(url + "/login?id=1")
		.then(raw => raw.text())
		.then(token => {
			sessionStorage.setItem("login-token", token);
			return token;
		});
}
