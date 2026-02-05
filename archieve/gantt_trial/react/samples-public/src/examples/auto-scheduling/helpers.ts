import { Task, Link, DataCallbackChange } from "@dhx/trial-react-gantt"; 

export function updateTasks(prevTasks: Task[], taskChanges: DataCallbackChange[]) {
	let updatedTasks = [...prevTasks];

	taskChanges.forEach(change => {
		const { action, id, data } = change;
		const index = updatedTasks.findIndex(task => task.id === id);

		if (action === "update" && index !== -1) {
			updatedTasks[index] = { ...updatedTasks[index], ...data };
		} else if (action === "create") {
			updatedTasks.push(data);
		} else if (action === "delete" && index !== -1) {
			updatedTasks.splice(index, 1);
		}
	});

	return updatedTasks;
}

export function updateLinks(prevLinks: Link[], linkChanges: DataCallbackChange[]) {
	let updatedLinks = [...prevLinks];

	linkChanges.forEach(change => {
		const { action, id, data } = change;
		const index = updatedLinks.findIndex(link => link.id === id);

		if (action === "update" && index !== -1) {
			updatedLinks[index] = { ...updatedLinks[index], ...data };
		} else if (action === "create") {
			updatedLinks.push(data);
		} else if (action === "delete" && index !== -1) {
			updatedLinks.splice(index, 1);
		}
	});

	return updatedLinks;
}