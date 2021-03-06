Vue.filter('date', function (val) {
	return moment(val).format('l');
});
Vue.filter('time', function (val) {
	return moment(val).format('LTS');
});
Vue.filter('phone', function (val) {
	return val.slice(-10);
});

new Vue({
	el: '#app',
	data: {
		startDate: '',
		endDate: '',
		from: '',
		to: '',
		direction: '',
		columns: ['Date', 'Time', 'Direction', 'From', 'To', 'Duration', 'Status', 'Recording'],
		offset: 0,
		limit: 25,
		cdrs: []
	},
	ready: function() {
		this.fetchRecords();
	},
	computed: {
		prevDisabled: function() {
			return this.offset <= 0;
		},
		nextDisabled: function() {
			return this.offset + this.limit >= this.cdrs.meta.length;
		}
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
			});
		},
		incrementRecords: function() {
			this.offset = this.offset + this.limit;
//			console.log('Offset: ' + this.offset);
			this.fetchRecords();

		},
		decrementRecords: function() {
			this.offset = this.offset - this.limit;
//			console.log('Offset: ' + this.offset);
			this.fetchRecords();

		},
		filterRecords: function() {
			this.fetchRecords();
		}
	}
});
