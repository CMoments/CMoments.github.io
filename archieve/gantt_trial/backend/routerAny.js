const actions = {
	inserted: "inserted",
	updated: "updated",
	deleted: "deleted",
	error: "error"
};

let order = 100;

class RouterAny {
	constructor(root) {
		this.root = root;
	}

	sendResponse(action, req, res) {
		try {
			order++;
			res.send({action: action, tid: order});
		} catch (e) {
			res.send({action: actions.error, message: e.message});
		}
	}

	rootResponse(req, res) {
		this.sendResponse("ok", req, res)
	}

	addItem(req, res) {
		this.sendResponse(actions.inserted, req, res)
	}

	updateItem(req, res) {
		this.sendResponse(actions.updated, req, res)
	}

	deleteItem(req, res) {
		this.sendResponse(actions.deleted, req, res)
	}


	connect(app) {
		this._connect(app, "");
		this._connect(app, "/gantt/backend");
		this._connect(app, "/backend");
	}

	_connect(app, prefix){
		// REST responses
		app.get(`${prefix}${this.root}`, this.rootResponse.bind(this));
		app.post(`${prefix}${this.root}/*`, this.addItem.bind(this));
		app.put(`${prefix}${this.root}/*/:id`, this.updateItem.bind(this));
		app.delete(`${prefix}${this.root}/*/:id`, this.deleteItem.bind(this));

		// Any other responses
		app.post(`${prefix}${this.root}`, this.rootResponse.bind(this));
	}
}
module.exports = RouterAny;
