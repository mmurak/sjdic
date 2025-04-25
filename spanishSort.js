const traditionalSpanishAlphabet = [
	'a', 'b', 'c', 'ch', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'll',
	'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
const alphabetOrderMap = new Map();
traditionalSpanishAlphabet.forEach((char, index) => {
	alphabetOrderMap.set(char, index);
});
function getSortOrder(unit) {
	return alphabetOrderMap.get(unit.toLowerCase());
}



function getCollationUnits(str) {
	if (!str) return [];
	const lowerStr = str.toLowerCase();
	const units = [];
	let i = 0;
	while (i < lowerStr.length) {
		let currentUnit = lowerStr[i];
		if (currentUnit === 'c' && i + 1 < lowerStr.length && lowerStr[i+1] === 'h') {
			currentUnit = 'ch';
			i += 2;
		} else if (currentUnit === 'l' && i + 1 < lowerStr.length && lowerStr[i+1] === 'l') {
			currentUnit = 'll';
			i += 2;
		} else {
			i += 1;
		}
		units.push(currentUnit);
	}
	return units;
}

function classicSpanishRule(a, b) {
	const unitsA = getCollationUnits(a);
	const unitsB = getCollationUnits(b);

	const len = Math.min(unitsA.length, unitsB.length);

	for (let i = 0; i < len; i++) {
		const orderA = getSortOrder(unitsA[i]);
		const orderB = getSortOrder(unitsB[i]);

		if (orderA === undefined && orderB !== undefined) return 1;
		if (orderA !== undefined && orderB === undefined) return -1;
		if (orderA === undefined && orderB === undefined) {
			if (unitsA[i] < unitsB[i]) return -1;
			if (unitsA[i] > unitsB[i]) return 1;
		} else if (orderA !== orderB) {
			return orderA - orderB;
		}
	}
	return unitsA.length - unitsB.length;
}

export { classicSpanishRule };
