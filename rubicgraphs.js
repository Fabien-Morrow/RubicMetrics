// theses globals variables will contain data from csv
// used for graph updates, their values remain constant after feeding
let original_data = new Map();

let eth_adressesData = [];
let bsc_adressesData = [];
let matic_adressesData = [];

const HTMLCollectionlistCharts = document.getElementsByClassName("chart");
const arrayHTMLCollectionlistCharts = Array.from(HTMLCollectionlistCharts);
const listCharts = arrayHTMLCollectionlistCharts.map(item => item.id);

let charts = new Map();

for (let chartCanvasId of listCharts) {
	let chartCharacteristics = {
		start: chartCanvasId+"RangeStart",
		end: chartCanvasId+"RangeEnd",
		chart : ''
	};
	charts.set(chartCanvasId, chartCharacteristics);
}

let colors = {
	total_adresses: 'rgba(0, 0, 0, 0.5)',
	eth_adresses: 'rgba(28, 28, 225, 0.7)',
	bsc_adresses: 'rgba(251, 218, 60, 0.7)',
	matic_adresses: 'rgba(130, 71, 229, 0.7)',

};

// creating every chart with specific options for each

charts.get("totalAdresses").chart = new Chart("totalAdresses", {
                  type: 'line',
                  data: {
                      labels: [],
                      datasets: [{
                          label: 'Total adresses on both chains holding RBC',
                          data: [],
						  id: 'total_adresses', // key to access theses data in original_data map for updates
                      },
					  ]
                  }
});

charts.get("totalAdressesVar").chart = new Chart("totalAdressesVar", {
                  type: 'line',
                  data: {
                      labels: [],
                      datasets: [{
                          label: 'Daily variations of total adresses on both chains holding RBC',
                          data: [],
						  id: 'var_total_adresses', // key to access theses data in original_data map for updates
                      },
					  ]
                  }
});

charts.get("adressesByChains").chart = new Chart("adressesByChains", {
                  type: 'line',
				  options: {
					  scales: {
						  yAxes: [{
							  ticks: { beginAtZero: true },
							  stacked: true
						  }],
						  xAxes : [{
							  stacked: true
						  }]
					  }
				  },
                  data: {
                      labels: [],
                      datasets: [{
							label: 'Eth adresses',
							data: [],
							backgroundColor: colors.eth_adresses,
							id: 'eth_adresses',
							},
							{
							label: 'Bsc adresses',
							data: [],
							backgroundColor: colors.bsc_adresses,
							id: 'bsc_adresses',
							},
							{
							label: 'Matic adresses',
							data: [],
							backgroundColor: colors.matic_adresses,
							id: 'matic_adresses',
							}
							]
                  }
});

charts.get("ethAdresses").chart = new Chart("ethAdresses", {
                  type: 'line',
                  data: {
                      labels: [],
                      datasets: [{
                          label: 'Adresses holding RBC on Ethereum',
                          data: [],
						  backgroundColor: colors.eth_adresses,
						  id: 'eth_adresses', // key to access theses data in original_data map for updates
                      },
					  ]
                  }
});

charts.get("ethAdressesVar").chart = new Chart("ethAdressesVar", {
                  type: 'line',
                  data: {
                      labels: [],
                      datasets: [{
                          label: 'Daily variations of adresses holding RBC on Ethereum',
                          data: [],
						  backgroundColor: colors.eth_adresses,
						  id: 'var_eth_adresses', // key to access theses data in original_data map for updates
                      },
					  ]
                  }
});

charts.get("bscAdresses").chart = new Chart("bscAdresses", {
                  type: 'line',
                  data: {
                      labels: [],
                      datasets: [{
                          label: 'Adresses holding RBC on Binance Smart Chain',
                          data: [],
						  backgroundColor: colors.bsc_adresses,
						  id: 'bsc_adresses', // key to access theses data in original_data map for updates
                      },
					  ]
                  }
});

charts.get("bscAdressesVar").chart = new Chart("bscAdressesVar", {
                  type: 'line',
                  data: {
                      labels: [],
                      datasets: [{
                          label: 'Daily variations of adresses holding RBC on Binance Smart Chain',
                          data: [],
						  backgroundColor: colors.bsc_adresses,
						  id: 'var_bsc_adresses', // key to access theses data in original_data map for updates
                      },
					  ]
                  }
});

charts.get("maticAdresses").chart = new Chart("maticAdresses", {
                  type: 'line',
                  data: {
                      labels: [],
                      datasets: [{
                          label: 'Adresses holding RBC on Polygon',
                          data: [],
						  backgroundColor: colors.matic_adresses,
						  id: 'matic_adresses', // key to access theses data in original_data map for updates
                      },
					  ]
                  }
});

charts.get("maticAdressesVar").chart = new Chart("maticAdressesVar", {
                  type: 'line',
                  data: {
                      labels: [],
                      datasets: [{
                          label: 'Daily variations of adresses holding RBC on Polygon',
                          data: [],
						  backgroundColor: colors.matic_adresses,
						  id: 'var_matic_adresses', // key to access theses data in original_data map for updates
                      },
					  ]
                  }
});

charts.get("instantSwapsDaily").chart = new Chart("instantSwapsDaily", {
                  type: 'line',
                  data: {
                      labels: [],
                      datasets: [{
                          label: 'Cumulated volume daily swaps on rubic.exchange',
                          data: [],
						  id: 'instant_trades', // key to access theses data in original_data map for updates
                      },
					  ]
                  }
});

charts.get("instantSwapsDailyVar").chart = new Chart("instantSwapsDailyVar", {
                  type: 'line',
                  data: {
                      labels: [],
                      datasets: [{
                          label: 'Cumulated volume daily swaps on rubic.exchange',
                          data: [],
						  id: 'var_instant_trades', // key to access theses data in original_data map for updates
                      },
					  ]
                  }
});

charts.get("bridgeCrossChainDaily").chart = new Chart("bridgeCrossChainDaily", {
                  type: 'line',
                  data: {
                      labels: [],
                      datasets: [{
                          label: 'Cumulated volume daily swaps on rubic.exchange',
                          data: [],
						  id: 'bridges', // key to access theses data in original_data map for updates
                      },
					  ]
                  }
});

charts.get("bridgeCrossChainDailyVar").chart = new Chart("bridgeCrossChainDailyVar", {
                  type: 'line',
                  data: {
                      labels: [],
                      datasets: [{
                          label: 'Cumulated volume daily swaps on rubic.exchange',
                          data: [],
						  id: 'var_bridges', // key to access theses data in original_data map for updates
                      },
					  ]
                  }
});

function selectRangeFromNow(chartCanvasId, range = original_data.get("date").length) {
	// updating the "*RangeEnd" input min value
	let rangeEndwidget = document.getElementById(charts.get(chartCanvasId).end);
	rangeEndwidget.value = rangeEndwidget.max;
	
    updateMax(chartCanvasId, rangeEndwidget.value);
	
	// updating the "*RangeStart" input min value
	let rangeStartwidget = document.getElementById(charts.get(chartCanvasId).start);
	rangeStartwidget.value = original_data.get("date").length - range + 1;
	
    updateMin(chartCanvasId, rangeStartwidget.value);
}


// chartCanvasId : 

function updateMin(chartCanvasId, range = 1) {
	const rangeStart = range - 1;
	const rangeEnd = document.getElementById(charts.get(chartCanvasId).end).value;
	
    const newLabelRange = original_data.get("date").slice(rangeStart, rangeEnd);
    charts.get(chartCanvasId).chart.data.labels = newLabelRange;

	// update data for every dataset
	for (let currentDataSet of charts.get(chartCanvasId).chart.data.datasets) {
		const newDataRange = original_data.get(currentDataSet.id).slice(rangeStart, rangeEnd);
		currentDataSet.data = newDataRange;
	}
	
	// updating the "*RangeEnd" input min value
    document.getElementById(charts.get(chartCanvasId).end).min = range;
	
    charts.get(chartCanvasId).chart.update();
	}

function updateMax(chartCanvasId, range = original_data.get("date").length) {
	const rangeStart = document.getElementById(charts.get(chartCanvasId).start).value - 1;
	const rangeEnd = range;
	
    const newLabelRange = original_data.get("date").slice(rangeStart, rangeEnd);
    charts.get(chartCanvasId).chart.data.labels = newLabelRange;

	// update data for every dataset
	for (let currentDataSet of charts.get(chartCanvasId).chart.data.datasets) {
		const newDataRange = original_data.get(currentDataSet.id).slice(rangeStart, rangeEnd);
		currentDataSet.data = newDataRange;
	}
	
	// updating the "*RangeStart" input max value
    document.getElementById(charts.get(chartCanvasId).start).max = range;
	
    charts.get(chartCanvasId).chart.update();
	}

Papa.parse("https://raw.githubusercontent.com/Fabien-Morrow/RubicMetrics/main/rubicmetrics.csv", {
    header: true,
	skipEmptyLines: true,
    download: true,
    complete: function(rawrubicmetrics) {

		// care to keep same value for
		// - map key in original_data
		// - field in csv
		// - id value in every chart

		for (let field of rawrubicmetrics.meta.fields) {
			original_data.set(field, rawrubicmetrics.data.map(function(d) {
				return d[field];
			}));
		}

		// filling the charts
		for (let chartCanvasId of listCharts) {
			console.log(charts.get(chartCanvasId).chart.chart.ctx.canvas.getContext("2d"));
			var image2 = new Image();
			image2.src = "back-graph.png";
			charts.get(chartCanvasId).chart.chart.ctx.canvas.getContext("2d").drawImage(image2, 0, 0, 500, 500);
			currentChartData = charts.get(chartCanvasId).chart.data;
			currentChartData.labels = original_data.get("date");
			
			for (let currentDataSet of currentChartData.datasets) {
				// feeding the chart data with the csv value indicated with id in the current dataset
				currentDataSet.data = original_data.get(currentDataSet.id);
			}
			
			let rangeStart = document.getElementById(charts.get(chartCanvasId).start);
			let rangeEnd = document.getElementById(charts.get(chartCanvasId).end);
			rangeStart.max = original_data.get("date").length;
			rangeStart.value = 0;
			rangeEnd.max = original_data.get("date").length;
			rangeEnd.value = original_data.get("date").length;
			selectRangeFromNow(chartCanvasId, 30)
			charts.get(chartCanvasId).chart.update();
		}

    }
});

