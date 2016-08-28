Vue.filter('date', function (val) {
	return moment.unix(val).format('l');
});
Vue.filter('time', function (val) {
	return moment.unix(val).format('LTS');
});

new Vue({
	el: '#app',
	data: {
		startDate: '',
		endDate: '',
		from: '',
		to: '',
		direction: '',
		columns: ['Date', 'Time', 'Direction', 'From', 'To', 'Duration', 'Status', 'File'],
		offset: 0,
		limit: 25,
		prevButton: false,
		nextButton: true,
		cdrs: []
	},
	ready: function() {
		this.fetchRecords();

		var that = this;
		var socket = io.connect();

		socket.on('dBUpdate', function(data) {
			console.log('updated.');
			that.fetchRecords();
		});
	},
	methods: {
		fetchRecords: function() {
			var limit = parseInt(this.limit);
			var offset = parseInt(this.offset);
			var from = this.from;
			var to = this.to;
			var direction = this.direction;
			var startDate = this.startDate;
			var endDate = this.endDate;

			this.$http.get('/api/cdrs?limit=' + limit + '&offset=' + offset + '&from=' + from + '&to=' + to + '&direction=' + direction + '&startDate=' + startDate + '&endDate=' + endDate).then((response)=> {
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

		},
		filterRecords: function() {
			this.fetchRecords();
		}
	}
});