/* FORMAT

localStorage.pages = 
	[
		{
			id: <md5 hash>,
			data: {
				enabled: <boolean>,
				checkboxes: [
					{
						id: <md5 hash>,
						data: {
							enabled: <boolean>
						}
					}
				]
			}
		}
	]

*/

function initStorage() {
	// tento kod sa vzdy spusta pri otvoreni popupu
	var store = localStorage.getItem('pages');
	if ((store === null) || (store === undefined)) {
		localStorage.setItem('pages', JSON.stringify([]));
	}
}

function initPageData(page_hash) {
	// tento kod sa spusta po kliknuti buttonu
	var pages = JSON.parse(localStorage.pages);
	var page_found = -1;
	var enabled = false;

	for (var i=pages.length-1; i>=0; i--) {
		if (pages[i].id == page_hash) {
			page_found = i;
			break;
		}
	}

	if (page_found >= 0) {
		// existujuca stranka
		// but vypnut alebo zapnut zobrazovanie checkboxov
		pages[page_found].data.enabled = !pages[page_found].data.enabled;
		enabled = pages[page_found].data.enabled;
	} else {
		// nova stranka
		// vytvorenie struktury objektu kde sa budu ukladat checkboxy 
		// pripadne ine info o stranke
		var new_page = { 
			id: page_hash,
			data: {
				enabled: true,
				checkboxes: []
			}
		};
		pages.push(new_page);
		enabled = true;
	}

	localStorage.setItem('pages', JSON.stringify(pages));
	return enabled;
}