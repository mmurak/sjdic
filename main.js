import { classicSpanishRule } from "./spanishSort.js";

class GlobalManager {
	constructor() {
		this.tocSel = document.getElementById("TOCSel");
		this.tocSel.addEventListener("change", (evt) => {tocChange(evt.target.value);});
		this.entryField = document.getElementById("EntryField");
		this.searchButton = document.getElementById("SearchButton");
		this.searchButton.addEventListener("click", (evt) => {search();});
		this.clearButton = document.getElementById("ClearButton");
		this.clearButton.addEventListener("click", (evt) => {clearField();});
		this.enhe = document.getElementById("Enhe");
		this.enhe.addEventListener("click", (evt) => {
			let currentValue = this.entryField.value;
			const currentPosition = this.entryField.selectionStart;
			this.entryField.value = currentValue.substring(0, currentPosition)
				+ "ñ" + currentValue.substring(currentPosition);
			this.entryField.focus();
			this.entryField.selectionStart = currentPosition + 1;
			this.entryField.selectionEnd = this.entryField.selectionStart;
		});
		this.dielU = document.getElementById("Umlaut");
		this.dielU.addEventListener("click", (evt) => {
			let currentValue = this.entryField.value;
			const currentPosition = this.entryField.selectionStart;
			this.entryField.value = currentValue.substring(0, currentPosition)
				+ "ü" + currentValue.substring(currentPosition);
			this.entryField.focus();
			this.entryField.selectionStart = currentPosition + 1;
			this.entryField.selectionEnd = this.entryField.selectionStart;
		});
	}
}	// end of GlobalManager class
const G = new GlobalManager();


G.tocSel.appendChild(document.createElement("option"));
for (let i = 0; i < indexData.length; i++) {
	let name = indexData[i][0];
	let val = indexData[i][1]
	let elem = document.createElement("option");
	elem.text = name;
	elem.value = val;
	G.tocSel.appendChild(elem);
}
G.entryField.focus();
document.addEventListener("keydown", (evt) => {
	if (evt.key == "Enter") {
		search();
	} else if (evt.key == "Escape") {
		clearField();
	}
}, false);

function windowOpen(page) {
	window.open(baseURL + page, "検索結果");
	G.entryField.focus();
}

function search() {
	G.tocSel.selectedIndex = 0;
	let target = G.entryField.value.toLowerCase();
	target = target.normalize("NFD").replace(/[\u0300-\u0301]/g, "");
	let idx = entryData.length - 1;
	while((idx >= 0) && (classicSpanishRule(entryData[idx], target) > 0)) {
		idx--;
	}
	windowOpen(offset+idx);
}

function tocChange(val) {
	G.entryField.value = "";
	windowOpen(val);
}

function clearField() {
	G.tocSel.selectedIndex = 0;
	G.entryField.value = "";
	G.entryField.focus();
}
