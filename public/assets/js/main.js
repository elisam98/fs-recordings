$(()=> {

	var headers = ['date', 'direction', 'from', 'to', 'status', 'file'];

	$.getJSON('/api/cdrs', (data)=> {
		return data;
	}).then((data)=> {
		console.log(data);
	});

});