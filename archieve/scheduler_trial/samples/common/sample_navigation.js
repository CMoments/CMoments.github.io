function showSourceCode(folder, file) {
	const source_code = document.querySelector("#source_code");
	source_code.innerHTML = `<textarea id="source_code_text" disabled="true">${atob(sampleSource[folder][file])}"</textarea>`;
}

function addCodeHighlight() {
	const codeMirror = document.querySelector(".CodeMirror");
	if (codeMirror) codeMirror.parentNode.removeChild(codeMirror);

	const editor = CodeMirror.fromTextArea(document.querySelector("textarea"), {
		mode: "htmlmixed",
		styleActiveLine: true,
		lineNumbers: true,
		lineWrapping: true,
		matchBrackets: true,
		extraKeys: { "Ctrl-Space": "autocomplete" },
	});
}

function addApiReference(folder, file) {
	//clear when switching to another sample:
	const propertiesSection = document.querySelector(".properties");
	const templatesSection = document.querySelector(".templates");
	const methodsSection = document.querySelector(".methods");
	const eventsSection = document.querySelector(".events");
	const otherSection = document.querySelector(".other");
	const suggestionsSection = document.querySelector(".suggestions");
	const filesSection = document.querySelector(".files");

	propertiesSection.innerHTML = "";
	templatesSection.innerHTML = "";
	methodsSection.innerHTML = "";
	eventsSection.innerHTML = "";
	otherSection.innerHTML = "";
	suggestionsSection.innerHTML = "";
	filesSection.innerHTML = "";

	const svg = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g id="arrow-bottom-right 1">
	<path id="Vector" d="M3.205 9.5L2.5 8.795L7.795 3.5L4.5 3.5L4.5 2.5L9.5 2.5L9.5 7.5L8.5 7.5L8.5 4.205L3.205 9.5Z" fill="#0288D1" fill-opacity="0.7"/>
	</g>
	</svg>`;
	function appendAdditionalFiles(line, type) {
		if (line.indexOf("dhtmlxscheduler") > -1) {
			return;
		}
		let linkProperty = "src";
		if (type == "css") {
			linkProperty = "href";
		}
		type = "." + type;

		let srcIndex = line.indexOf(linkProperty);
		if (srcIndex > -1) {
			let leftUrlPart = line.slice(srcIndex + type.length + 2);
			let rightUrlPart = null;
			let filename = null;
			if (leftUrlPart.indexOf("google") > -1) {
				rightUrlPart = leftUrlPart.split('"')[0];
				filename = "Google API file";
			} else {
				rightUrlPart = leftUrlPart.split(type)[0] + type;
				let fileNameIndex = rightUrlPart.lastIndexOf("/");
				filename = rightUrlPart.slice(fileNameIndex + 1);
				if (leftUrlPart.indexOf("Chart.js") > -1) {
					rightUrlPart += leftUrlPart.split(type)[1] + type;
					filename = "Chart.js";
				}
			}

			let url = null;
			if (rightUrlPart.indexOf("http") > -1) {
				url = rightUrlPart;
			} else {
				let currentFolder = location.href.substring(0,location.href.lastIndexOf("/samples"));
				url = currentFolder + "/samples/" + folder + "/" + rightUrlPart;
			}
			if (rightUrlPart.indexOf("jquery") > -1 || rightUrlPart.indexOf("bootstrap") > -1 || rightUrlPart.indexOf("cdn.dhtmlx.com") > -1 || rightUrlPart.indexOf("google") > -1) {
				url = `https:` + rightUrlPart;
			}
			let fileElement = document.createElement("div");
			fileElement.innerHTML = `<div class='api-link'><a href="${url}" target='_blank'>${filename} ${svg}</a></div>`;
			filesSection.appendChild(fileElement);
		}
	}

	let lines = atob(sampleSource[folder][file]).split("\n");
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];

		if (line.indexOf("<title>") > -1) {
			let sampleName = line.split("<title>").join("").split("</title>").join("").trim();
			let suggestionsElement = document.createElement("div");
			suggestionsElement.innerHTML = `<div class='api-link'><a href = \"https://www.google.com/search?q=${sampleName} site:docs.dhtmlx.com/scheduler\" target='_blank' >${sampleName} ${svg}</a></div>`;
			suggestionsSection.appendChild(suggestionsElement);
		}
		if (line.indexOf("<script") > -1) {
			appendAdditionalFiles(line, "js");
		}
		if (line.indexOf("<link") > -1) {
			appendAdditionalFiles(line, "css");
		}

		let indexStart = line.indexOf("scheduler.");
		if (indexStart > -1) {
			let leftCut = line.slice(indexStart);
			let middleIndex = leftCut.indexOf(".");
			let middleCut = leftCut.slice(middleIndex + 1);
			// second occurence
			if (middleCut.indexOf("scheduler.") > -1) {
				lines.push(middleCut);
				middleCut = middleCut.split("scheduler.")[0];
			}

			if (middleCut.indexOf("config.") > -1) {
				let configValue = parseLine(middleCut, "config.");
				if (
					!configValue ||
					isCustomProperty("scheduler.config." + configValue)
				) {
					continue;
				}

				let configElement = document.createElement("div");
				configElement.innerHTML = `<div class='api-link'><a href = https://docs.dhtmlx.com/scheduler/api__scheduler_${configValue}_config.html target='_blank'>${configValue} ${svg}</a></div>`;

				if (
					checkDuplicateNodes(propertiesSection,configElement.innerHTML)
				) {
					propertiesSection.appendChild(configElement);
				}
			} else if (middleCut.indexOf("templates") > -1) {
				let templateValue = parseLine(middleCut, "templates.");
				if (
					!templateValue ||
					isCustomProperty("scheduler.templates." + templateValue)
				) {
					continue;
				}
				let templateElement = document.createElement("div");
				let customTemplateLink = getCustomTemplatesLink(templateValue);
				if (customTemplateLink){
					templateElement.innerHTML = `<div class='api-link'><a href = ${customTemplateLink[1]} target='_blank'>${customTemplateLink[0]} ${svg}</a></div>`;
				} else {
					templateElement.innerHTML = `<div class='api-link'><a href = https://docs.dhtmlx.com/scheduler/api__scheduler_${templateValue}_template.html target='_blank'>${templateValue} ${svg}</a></div>`;
				}
				if (checkDuplicateNodes(templatesSection,templateElement.innerHTML)) {
					templatesSection.appendChild(templateElement);
				}
			} else if (middleCut.indexOf("plugins") > -1) {
				let temp = i;
				while (lines[temp+1].replace(/\s+/g, '').replace(/\\t/, ' ') != "});"){ 
					let ext = lines[temp+1].replace(/\s+/g, '').replace(/\\t/, ' ').split(":")[0];
					const extElement = document.createElement("div");
					const extValue = getExtLink(ext);
					extElement.innerHTML = `<div class='api-link'><a href = ${extValue} target='_blank'>${ext} ${svg}</a></div>`;

					if (checkDuplicateNodes(otherSection, extElement.innerHTML)) {
						otherSection.appendChild(extElement);
					}
					temp++;
				}		
			} else if (middleCut.indexOf("attachEvent") > -1) {
				const eventValue = parseLine(middleCut, "attachEvent(", 13);
				if (!eventValue || isCustomProperty("scheduler.events." + eventValue)) {
					continue;
				}

				const eventElement = document.createElement("div");
				eventElement.innerHTML = `<div class='api-link'><a href = https://docs.dhtmlx.com/scheduler/api__scheduler_${eventValue.toLowerCase()}_event.html target='_blank'>${eventValue} ${svg}</a></div>`;

				if (
					checkDuplicateNodes(eventsSection, eventElement.innerHTML)
				) {
					eventsSection.appendChild(eventElement);
				}
			} else if (middleCut.indexOf("date.") > -1 || middleCut.indexOf("date[") > -1) {
				let indexOfDate = middleCut.indexOf("date.");
				if (indexOfDate < 0) {
					indexOfDate = middleCut.indexOf("date[");
				}

				const dateProcessElement = document.createElement("div");
				dateProcessElement.innerHTML = `<div class='api-link'><a href = https://docs.dhtmlx.com/scheduler/api__scheduler_date_other.html target='_blank'>date ${svg}</a></div>`;

				if (checkDuplicateNodes(otherSection,dateProcessElement.innerHTML)) {
					otherSection.appendChild(dateProcessElement);
				}
			} else if (middleCut.indexOf("locale.") > -1 || middleCut.indexOf("i18n.") > -1) {
				const localizationElement = document.createElement("div");
				localizationElement.innerHTML = `<div class='api-link'><a href = https://docs.dhtmlx.com/scheduler/localization.html target='_blank'>Localization ${svg}</a></div>`;

				if (checkDuplicateNodes(otherSection,localizationElement.innerHTML)) {
					otherSection.appendChild(localizationElement);
				}

				const localeElement = document.createElement("div");
				localeElement.innerHTML = `<div class='api-link'><a href = https://docs.dhtmlx.com/scheduler/api__scheduler_locale_other.html target='_blank'>scheduler.locale ${svg}</a></div>`;

				if (checkDuplicateNodes(otherSection, localeElement.innerHTML)) {
					otherSection.appendChild(localeElement);
				}
			} else if (middleCut.indexOf("(") > -1) {
				let tmpRight = middleCut.split("(")[0];
				let tmpValue = tmpRight.replace(/[\W]+/g, ".").split(".")[0].match(/\w/g);
				let methodValue = null;
				if (tmpValue && tmpValue[0]) {
					methodValue = tmpValue.join("");
				} else {
					continue;
				}

				if (isCustomProperty("scheduler." + methodValue)) {
					continue;
				}
				
				let methodElement = document.createElement("div");
				methodElement.innerHTML = `<div class='api-link'><a href = https://docs.dhtmlx.com/scheduler/api__scheduler_${methodValue.toLowerCase()}.html target='_blank'>${methodValue} ${svg}</a></div>`;
				if (methodValue.includes("ignore_")) {
					methodElement.innerHTML = `<div class='api-link'><a href = https://docs.dhtmlx.com/scheduler/custom_scales.html target='_blank'>${methodValue} ${svg}</a></div>`;
				}
				if (methodValue.includes("filter_")) {
					methodElement.innerHTML = `<div class='api-link'><a href = https://docs.dhtmlx.com/scheduler/filtering.html target='_blank'>${methodValue} ${svg}</a></div>`;
				}
				if (checkDuplicateNodes(methodsSection, methodElement.innerHTML)) {
					methodsSection.appendChild(methodElement);
				}
			} else if(middleCut.indexOf("xy.") > -1){
				let xyElement = document.createElement("div");
				xyElement.innerHTML = `<div class='api-link'><a href = https://docs.dhtmlx.com/scheduler/api__scheduler_xy_other.html target='_blank'>xy ${svg}</a></div>`;
				if (checkDuplicateNodes(otherSection, xyElement.innerHTML)) {
					otherSection.appendChild(xyElement);
				}
			}
		}
	}
}

function parseLine(middleCut, value, length) {
	length = length || value.length;

	let tmpLeft = middleCut.slice(middleCut.indexOf(value) + length);
	let tmpRight = tmpLeft.split("=")[0];
	let tmpValue = tmpRight.replace(/[\W]+/g, ".").split(".")[0].match(/\w/g);

	if (tmpValue && tmpValue[0]) {
		return tmpValue.join("");
	}

	return false;
}

function checkDuplicateNodes(el, content) {
	let children = el.childNodes;
	for (let i = 0; i < children.length; i++) {
		if (children[i].innerHTML == content) {
			return false;
		}
	}
	return true;
}

// Do not generate links for custom properties
function isCustomProperty(value) {
	let customProperties = [
		"scheduler._timeline_drag_date",
		"scheduler._drag_event",
		"scheduler.set_sizes",
		"scheduler.set_xy",
		"scheduler.set_actions",
		"scheduler.get_elements",
		"scheduler.$container",
		"scheduler.matrix",
	];
	if (customProperties.indexOf(value) > -1) {
		return true;
	} else {
		return false;
	}
}
function getCustomTemplatesLink(string){
	const templatesLinksObject = {
		_full_date: ["{gridName}_full_date","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Bgridname%7D_full_date_template.html"],
		_single_date: ["{gridName}_single_date","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Bgridname%7D_single_date_template.html"],
		_field: ["{gridName}_field","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Bgridname%7D_field_template.html"],
		_cell_value: ["{timelineName}_cell_value","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Btimelinename%7D_cell_value_template.html"],
		_cell_class: ["{timelineName}_cell_class","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Btimelinename%7D_cell_class_template.html"],
		_scalex_class: ["{timelineName}_scalex_class","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Btimelinename%7D_scalex_class_template.html"],
		_second_scalex_class: ["{timelineName}_second_scalex_class","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Btimelinename%7D_second_scalex_class_template.html"],
		_scaley_class: ["{timelineName}_scaley_class","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Btimelinename%7D_scaley_class_template.html"],
		_scale_label: ["{timelineName}_scale_label","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Btimelinename%7D_scale_label_template.html"],
		_tooltip: ["{timelineName}_tooltip","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Btimelinename%7D_tooltip_template.html"],
		_scale_date: ["{timelineName}_scale_date","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Btimelinename%7D_scale_date_template.html"],
		_second_scale_date: ["{timelineName}_second_scale_date","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Btimelinename%7D_second_scale_date_template.html"],
		_scale_text: ["{unitsName}_scale_text","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Bunitsname%7D_scale_text_template.html"],
		_row_class: ["{timelineName}_row_class","https://docs.dhtmlx.com/scheduler/api__scheduler_%7Btimelinename%7D_row_class_template.html"],
	}
	for (let prop in templatesLinksObject) {
		if (string.includes(`${prop}`)) {
			return templatesLinksObject[prop];
		}
	}
}
function getExtLink(ext){
	const extensionLinksObject = {
		active_links: "https://docs.dhtmlx.com/scheduler/api__scheduler_active_link_view_config.html",
		agenda_view: "https://docs.dhtmlx.com/scheduler/agenda_view.html",
		all_timed: "https://docs.dhtmlx.com/scheduler/api__scheduler_all_timed_config.html",
		collision: "https://docs.dhtmlx.com/scheduler/collisions.html",
		container_autoresize: "https://docs.dhtmlx.com/scheduler/api__scheduler_container_autoresize_config.html",
		cookie: "https://docs.dhtmlx.com/scheduler/configuration.html#extensions",
		daytimeline: "https://docs.dhtmlx.com/scheduler/timeline_view.html",
		drag_between: "https://docs.dhtmlx.com/scheduler/dhtmlx_components_integration.html#draganddropbetweenschedulers",
		editors: "https://docs.dhtmlx.com/scheduler/lightbox_editors.html",
		expand: "https://docs.dhtmlx.com/scheduler/api__scheduler_expand.html",
		export_api: "https://docs.dhtmlx.com/scheduler/pdf.html",
		grid_view: "https://docs.dhtmlx.com/scheduler/grid_view.html",
		html_templates: "https://docs.dhtmlx.com/scheduler/templates.html#specifyingtemplatesasanhtmlcode",
		key_nav: "https://docs.dhtmlx.com/scheduler/keyboard_navigation.html",
		legacy: "https://docs.dhtmlx.com/scheduler/migration_from_older_version.html",
		limit: "https://docs.dhtmlx.com/scheduler/limits.html",
		map_view: "https://docs.dhtmlx.com/scheduler/map_view.html",
		minical: "https://docs.dhtmlx.com/scheduler/minicalendar.html",
		multisection: "https://docs.dhtmlx.com/scheduler/api__scheduler_multisection_config.html",
		multiselect: "https://docs.dhtmlx.com/scheduler/lightbox_editors.html",
		multisource: "https://docs.dhtmlx.com/scheduler/loading_data.html#loadingdatafrommultiplesources",
		mvc: "https://docs.dhtmlx.com/scheduler/backbone_integration.html",
		outerdrag: "https://docs.dhtmlx.com/scheduler/dhtmlx_components_integration.html",
		quick_info: "https://docs.dhtmlx.com/scheduler/touch_support.html#quickinfoextension",
		readonly: "https://docs.dhtmlx.com/scheduler/readonly.html",
		recurring: "https://docs.dhtmlx.com/scheduler/recurring_events.html",
		serialize: "https://docs.dhtmlx.com/scheduler/export.html",
		timeline: "https://docs.dhtmlx.com/scheduler/timeline_view.html",
		tooltip: "https://docs.dhtmlx.com/scheduler/tooltips.html",
		treetimeline: "https://docs.dhtmlx.com/scheduler/timeline_view.html",
		units: "https://docs.dhtmlx.com/scheduler/units_view.html",
		url: "https://docs.dhtmlx.com/scheduler/server_integration.html",
		week_agenda: "https://docs.dhtmlx.com/scheduler/weekagenda_view.html",
		year_view: "https://docs.dhtmlx.com/scheduler/year_view.html",
	}
	for (let prop in extensionLinksObject) {
		if (prop == ext) {
			return extensionLinksObject[prop];
		}
	}
}
window.addEventListener("click", function (e) {
	if (e.target.classList.contains("link")) {
		e.preventDefault();
		let firstLaunch = false;
		let previousHighlights = document.querySelectorAll("[data-highlighted='true']");
		if (previousHighlights[0]) {
			for (let i = 0; i < previousHighlights.length; i++) {
				previousHighlights[i].dataset.highlighted = false;
				previousHighlights[i].classList.remove("active");
			}
		} else {
			firstLaunch = true;
			document.querySelector("#x6").addEventListener('load', function(e){
				if (document.querySelector(".loading")){
					document.querySelector(".loading").remove();
				}
				document.querySelector("#x6").style.opacity = 1;
				document.querySelector(".demo").style.overflow = "auto";
			});
		}

		let el = e.target;
		let folder = el.dataset.folder;
		let file = el.id;
		let demoFrame = document.querySelector("#x6");

		el.classList.add("active");
		el.dataset.highlighted = true;

		el.parentNode.classList.add("active");
		el.parentNode.dataset.highlighted = true;

		showSourceCode(folder, file);

		if (isFolder()) {
			document.querySelector("#current_sample").href = "./" + file;
		} else {
			document.querySelector("#current_sample").href = folder + "/" + file;
		}
		let currentUrl = window.location.protocol + "//" + window.location.host + window.location.pathname,
			currentSample = document.querySelector("#current_sample"),
			sample = currentSample.attributes.href.value,
			filter = document.querySelector(".search-field").value,
			link = currentUrl + "?sample='" + sample + "'&filter='" + filter + "'";

		window.history.replaceState("", "Scheduler samples", link);
		demoFrame.src = "";
		try {
			addApiReference(folder, file);
		} catch (e) {}

		setTimeout(function () {
			addCover();
		});

		try {
			toggle_demo("demo");
		} catch (e) {}

		setTimeout(function () {
			if (el.dataset.level) {
				demoFrame.src = "./" + file;
			} else {
				demoFrame.src = "./" + folder + "/" + file;
			}
			addCover();
		}, 200);

		if (!firstLaunch) {
			document.getElementById("nav-dropdown-list").classList.remove("opened");
			document.getElementById("nav-dropdown-chosen").innerText = "Demo";
		}
	}

	let share_click =
		e.target.classList.contains("share_link") ||
		e.target.classList.contains("share_button") ||
		e.target.classList.contains("share_dialog") ||
		e.target.classList.contains("share");

	if (!share_click) {
		removeShareDialog();
	}
});

function addCover() {
	let parent = document.querySelector(".demo");
	let frame = document.querySelector("#x6");
	let svg = `<div class="loading"><svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" class="spinner"/></svg></div>`;
	let loader = document.querySelector(".loading");
	if (loader){	
		loader.remove();
	} else {
		parent.insertAdjacentHTML("afterbegin",svg);
	}
	parent.style.overflow = "hidden";
	frame.style.opacity = 1;
}

function toggle_demo(type) {
	let views = {};

	views.demo = document.querySelector("#x6");
	views.code = document.querySelector("#source_code");
	views.api = document.querySelector("#api_reference");

	for (let el in views) {
		views[el].style.display = "none";
	}
	views[type].style.display = "block";

	let tabs = {};

	tabs.demo = document.getElementsByClassName("show_demo");
	tabs.code = document.getElementsByClassName("show_code");
	tabs.api = document.getElementsByClassName("show_api");

	for (let el in tabs) {
		for (let i = 0; i < tabs[el].length; i++) {
			tabs[el][i].classList.remove("active");
		}
	}

	for (let i = 0; i < tabs[type].length; i++) {
		tabs[type][i].classList.add("active");
	}

	if (type == "code") {
		addCodeHighlight();
	}
}

function is_mobile() {
	let is_mobile_device = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i) ? true : false;
	return is_mobile_device;
}

function toggle_list() {
	let pageAsideElem = document.getElementById("page-aside");

	if (pageAsideElem.classList.contains("aside-state") && is_mobile()) {
		bodyScrollLock.enableBodyScroll(pageAsideElem);
	} else {
		bodyScrollLock.disableBodyScroll(pageAsideElem);
	}

	pageAsideElem.classList.toggle("aside-state");
}

function toggle_mobile_menu(e) {
	if (e.target.classList.contains("page-aside")) {
		toggle_list();
	}
}

function filterSamples(value) {
	let links = document.querySelector(".links");
	let folders = links.querySelectorAll("input");

	for (let i = 0; i < folders.length; i++) {
		folders[i].checked = !!value;
	}

	let files = links.querySelectorAll(".link");
	let results = false;
	let showWithChildren = {};

	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		if (value && file.innerHTML.toLowerCase().indexOf(value.toLowerCase()) < 0) {
			file.style.display = "none";
		} else {
			file.style.display = "";
			results = true;
			let relatedFolder = file.parentNode.parentNode.querySelector("label");
			if (relatedFolder) {
				showWithChildren[relatedFolder.innerHTML] = true;
			}
		}
	}

	let labels = links.querySelectorAll("label");
	for (let i = 0; i < labels.length; i++) {
		if (value && labels[i].innerHTML.toLowerCase().indexOf(value.toLowerCase()) < 0
		) {
			labels[i].classList.add("hidden");
		} else {
			labels[i].classList.remove("hidden");
			let childSamples = labels[i].parentNode.querySelectorAll(".link");
			for (let j = 0; j < childSamples.length; j++) {
				childSamples[j].style.display = "";
			}
			results = true;
		}
		if (showWithChildren[labels[i].innerHTML]) {
			labels[i].classList.remove("hidden");
			results = true;
		}
	}

	let noResults = document.querySelector(".no_results");

	if (results) {
		noResults.classList.remove("visible");
	} else {
		noResults.classList.add("visible");
	}
}

function isFolder() {
	const folderName = false;
	const path = window.location.pathname;
	const sampleFolders = [
		"01_initialization_loading",
		"02_customization",
		"03_extensions",
		"04_export",
		"05_calendar",
		"06_timeline",
		"07_skins",
		"09_api",
		"10_integration",
		"11_scales",
		"12_multisection_events",
		"13_accessibility",
		"14_rtl",
		"20_multiple",
	];
	sampleFolders.forEach(function (folder) {
		if (path.indexOf(folder) > -1) {
			folderName = folder;
		}
	});
	return folderName;
}

function loadSampleFromParams() {
	const paramString = window.location.search || "sample='01_initialization_loading/01_basic_init.html'";

	let folder = isFolder();
	if (folder) {
		let sample = document.querySelector("[data-folder='" + folder + "']");
		if (sample) {
			sample.click();
		}
	}

	let params = paramString.split("&");
	params.forEach(function (parameter) {
		if (parameter.indexOf("filter=") > -1) {
			let filter = decodeURI(parameter.split("filter=")[1])
				.replace(/"/g, "")
				.replace(/'/g, "");
			document.querySelector(".search-field").value = filter;
			filterSamples(filter);
		}
		if (parameter.indexOf("sample=") > -1) {
			let link = decodeURI(parameter.split("sample=")[1])
				.replace(/"/g, "")
				.replace(/'/g, "");
			let path = link.split("/");
			if (path[0] == ".") {
				path[0] = document.querySelector("[data-folder]").dataset.folder;
			}
			let sample = document.querySelector("[data-folder='" + path[0] + "'][id='" + path[1] + "']");

			if (sample) {
				sample.click();
				setTimeout(function () {
					sample.parentNode.parentNode.querySelector("input").checked = true;
					let menu = document.querySelector(".links");
					let offset = menu.getBoundingClientRect().top;
					let folderCoordinates = sample.parentNode.parentNode.getBoundingClientRect();
					menu.scrollTo(0, folderCoordinates.y - offset);
				}, 4);
			}
		}
	});
}

function shareSample() {
	removeShareDialog();

	const currentUrl = window.location.protocol + "//" + window.location.host + window.location.pathname,
		currentSample = document.querySelector("#current_sample"),
		sample = currentSample.attributes.href.value,
		filter = document.querySelector(".search-field").value,
		link = currentUrl + "?sample='" + sample + "'&filter='" + filter + "'";

	const shareElement = document.createElement("div");
	shareElement.className = "share_dialog";

	const shareElementInside = document.createElement("div");
	shareElementInside.className = "share_dialog-field";

	const shareText = document.createElement("div");
	shareText.className = "share_text";

	shareElement.appendChild(shareText);

	const shareLink = document.createElement("input");
	shareLink.className = "share_link";
	shareLink.value = link;
	shareElementInside.appendChild(shareLink);

	const shareButton = document.createElement("input");
	shareButton.className = "share_button";
	shareButton.type = "button";
	shareButton.value = "Copy link";

	shareButton.onclick = function () {
		navigator.clipboard.writeText(shareLink.value);
		shareButton.value = "Copied!";
	};

	shareElementInside.appendChild(shareButton);
	shareElement.appendChild(shareElementInside);
	document.body.appendChild(shareElement);
}

function removeShareDialog() {
	const shareElement = document.querySelector(".share_dialog");

	if (shareElement) {
		shareElement.innerHTML = "";
		shareElement.parentNode.removeChild(shareElement);
	}
}

function navDropdown() {
	const navDropdownElement = document.getElementById("nav-dropdown-list");
	navDropdownElement.classList.toggle("opened");
}

function toggle_dropdown(e) {
	navDropdown();
	document.getElementById("nav-dropdown-chosen").innerText = e.target.innerText;
}

function addHref() {
	let links = document.querySelectorAll(".link");
	for (let i = 0; i < links.length; i++) {
		links[i].href = `./${links[i].dataset.folder}/${links[i].id}`;
	}
}

function addTransitionEffects(){
	let pageAside = document.querySelector("#page-aside");
	let asideLinks = document.querySelectorAll(".link");
	pageAside.addEventListener("transitionstart", (event) => {
		if (event.target.id == "page-aside"){
			asideLinks.forEach(link => link.classList.add("nowrap"));
		} else {
			return false;
		}
	});
	pageAside.addEventListener("transitionend", (event) => {
		asideLinks.forEach(link => link.classList.remove("nowrap"));
	});
}

document.addEventListener("DOMContentLoaded", addHref);
document.addEventListener("DOMContentLoaded", addTransitionEffects);