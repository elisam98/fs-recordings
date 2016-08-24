Vue.filter('date', function (val) {
	return moment(val / 1000).format('LLL');
});

new Vue({
	el: '#app',
	data: {
		startDate: '',
		endDate: '',
		from: '',
		to: '',
		direction: '',
		columns: ['Date', 'Direction', 'From', 'To', 'Duration', 'Status', 'File'],
//		sortKey: 'date',
//		reverse: 1,
		offset: 0,
		limit: 10,
		prevButton: false,
		nextButton: true,
		cdrs: []
	},
	ready: function() {
		this.fetchRecords();
	},
	methods: {
		fetchRecords: function() {
			var limit = parseInt(this.limit);
			var offset = parseInt(this.offset);

			this.$http.get('/api/cdrs?limit=' + limit + '&offset=' + offset).then((response)=> {
				this.$set('cdrs', response.json());
//				console.log(response);
			}, (error)=> {
//				console.log(response);
			});
		},
		incrementRecords: function() {
			this.offset = this.offset + this.limit;
			console.log('Offset: ' + this.offset);
			this.fetchRecords();

		},
		decrementRecords: function() {
			this.offset = this.offset - this.limit;
			console.log('Offset: ' + this.offset);
			this.fetchRecords();

		}
	}
});