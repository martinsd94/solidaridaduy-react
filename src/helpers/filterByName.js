import levenshtein from 'fast-levenshtein';

export function filterByName (initiatives_array, name) {
	let result = [];
	let init;

	for(let i = 0; i < initiatives_array.length; i++) {
		init = initiatives_array[i];
		if(init.name) {
			if (levenshtein.get(name.toLowerCase(), init.name.toLowerCase()) < 4) {
				result.push(init);
			}
			else if(init.name.toLowerCase().indexOf(name.toLowerCase()) > -1) {
				result.push(init);
			}
		}
	}
	return result;
}