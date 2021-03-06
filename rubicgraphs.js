// this global variable will contain data from csv
// used for graph updates, his value remain constant after feeding
let original_data = new Map();

const HTMLCollectionlistCharts = document.getElementsByClassName("chart");
const arrayHTMLCollectionlistCharts = Array.from(HTMLCollectionlistCharts);
const listCharts = arrayHTMLCollectionlistCharts.map(item => item.id);

let charts = new Map();

for (let chartCanvasId of listCharts) {
    let chartCharacteristics = {
        start: chartCanvasId + "RangeStart",
        end: chartCanvasId + "RangeEnd",
        chart: ''
    };
    charts.set(chartCanvasId, chartCharacteristics);
}

let colors = {
    rbc: 'rgba(74, 169, 86, 0.7)',
    eth: 'rgba(28, 28, 225, 0.7)',
    bsc: 'rgba(251, 218, 60, 0.7)',
    matic: 'rgba(130, 71, 229, 0.7)',
    swaps: 'rgba(74, 169, 86, 0.7)',
    bridges: 'rgba(251, 91, 22, 0.7)',
    volume: 'rgba(200, 200, 200, 0.7)',


};

let graphAddressesOptions = {
    scales: {
        xAxes: [{
            display: true,
            gridLines: {
                display: true,
                color: "#888888",
            },
        }],
        yAxes: [{
            display: true,
            gridLines: {
                display: true,
                color: "#888888",
            },
            ticks: {
                callback: (value, index, values) => {
                    return new Intl.NumberFormat('en-US', {
                        style: 'decimal'
                    }).format(value);
                }
            },
        }]
    }
};

let graphVolumesOptions = {
    scales: {
        xAxes: [{
            display: true,
            gridLines: {
                display: true,
                color: "#888888",
            },
        }],
        yAxes: [{
            display: true,
            gridLines: {
                display: true,
                color: "#888888",
            },
            ticks: {
                callback: (value, index, values) => {
                    return new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumSignificantDigits: 3
                    }).format(value);
                }
            },
        }]
    }
};

// creating every chart with specific options for each

charts.get("totalAddresses").chart = new Chart("totalAddresses", {
    type: 'line',
    options: graphAddressesOptions,
    data: {
        labels: [],
        datasets: [{
            label: 'Total addresses on both chains holding RBC',
            data: [],
            backgroundColor: colors.rbc,
            id: 'total_addresses', // key to access theses data in original_data map for updates
        }, ]
    },
});

charts.get("totalAddressesVar").chart = new Chart("totalAddressesVar", {
    type: 'line',
    options: graphAddressesOptions,
    data: {
        labels: [],
        datasets: [{
            label: 'Daily variations of total addresses on both chains holding RBC',
            data: [],
            backgroundColor: colors.rbc,
            id: 'var_total_addresses', // key to access theses data in original_data map for updates
        }, ]
    },
});

charts.get("addressesByChains").chart = new Chart("addressesByChains", {
    type: 'line',
    options: {
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    display: true,
                    color: "#888888",
                },
            }],
            yAxes: [{
                display: true,
                stacked: true,
                gridLines: {
                    display: true,
                    color: "#888888",
                },
                ticks: {
                    callback: (value, index, values) => {
                        return new Intl.NumberFormat('en-US', {
                            style: 'decimal'
                        }).format(value);
                    }
                },
            }]
        }
    },
    data: {
        labels: [],
        datasets: [{
                label: 'Eth addresses',
                data: [],
                backgroundColor: colors.eth,
                id: 'eth_addresses',
            },
            {
                label: 'Bsc addresses',
                data: [],
                backgroundColor: colors.bsc,
                id: 'bsc_addresses',
            },
            {
                label: 'Matic addresses',
                data: [],
                backgroundColor: colors.matic,
                id: 'matic_addresses',
            }
        ],
    }
});

charts.get("ethAddresses").chart = new Chart("ethAddresses", {
    type: 'line',
    options: graphAddressesOptions,
    data: {
        labels: [],
        datasets: [{
            label: 'Addresses holding RBC on Ethereum',
            data: [],
            backgroundColor: colors.eth,
            id: 'eth_addresses', // key to access theses data in original_data map for updates
        }, ]
    }
});

charts.get("ethAddressesVar").chart = new Chart("ethAddressesVar", {
    type: 'line',
    options: graphAddressesOptions,
    data: {
        labels: [],
        datasets: [{
            label: 'Daily variations of addresses holding RBC on Ethereum',
            data: [],
            backgroundColor: colors.eth,
            id: 'var_eth_addresses', // key to access theses data in original_data map for updates
        }, ]
    }
});

charts.get("bscAddresses").chart = new Chart("bscAddresses", {
    type: 'line',
    options: graphAddressesOptions,
    data: {
        labels: [],
        datasets: [{
            label: 'Addresses holding RBC on Binance Smart Chain',
            data: [],
            backgroundColor: colors.bsc,
            id: 'bsc_addresses', // key to access theses data in original_data map for updates
        }, ]
    }
});

charts.get("bscAddressesVar").chart = new Chart("bscAddressesVar", {
    type: 'line',
    options: graphAddressesOptions,
    data: {
        labels: [],
        datasets: [{
            label: 'Daily variations of addresses holding RBC on Binance Smart Chain',
            data: [],
            backgroundColor: colors.bsc,
            id: 'var_bsc_addresses', // key to access theses data in original_data map for updates
        }, ]
    }
});

charts.get("maticAddresses").chart = new Chart("maticAddresses", {
    type: 'line',
    options: graphAddressesOptions,
    data: {
        labels: [],
        datasets: [{
            label: 'Addresses holding RBC on Polygon',
            data: [],
            backgroundColor: colors.matic,
            id: 'matic_addresses', // key to access theses data in original_data map for updates
        }, ]
    }
});

charts.get("maticAddressesVar").chart = new Chart("maticAddressesVar", {
    type: 'line',
    options: graphAddressesOptions,
    data: {
        labels: [],
        datasets: [{
            label: 'Daily variations of addresses holding RBC on Polygon',
            data: [],
            backgroundColor: colors.matic,
            id: 'var_matic_addresses', // key to access theses data in original_data map for updates
        }, ]
    }
});

charts.get("instantSwapsDaily").chart = new Chart("instantSwapsDaily", {
    type: 'line',
    options: graphVolumesOptions,
    data: {
        labels: [],
        datasets: [{
            label: 'Cumulated volume swaps on rubic.exchange',
            data: [],
            backgroundColor: colors.volume,
            id: 'instant_trades', // key to access theses data in original_data map for updates
        }, ]
    }
});

charts.get("instantSwapsDailyVar").chart = new Chart("instantSwapsDailyVar", {
    type: 'line',
    options: graphVolumesOptions,
    data: {
        labels: [],
        datasets: [{
            label: 'Daily volume of swaps on rubic.exchange',
            data: [],
            backgroundColor: colors.volume,
            id: 'var_instant_trades', // key to access theses data in original_data map for updates
        }, ]
    }
});

charts.get("bridgeCrossChainDaily").chart = new Chart("bridgeCrossChainDaily", {
    type: 'line',
    options: graphVolumesOptions,
    data: {
        labels: [],
        datasets: [{
            label: 'Cumulated volume bridges/crosschainswaps on rubic.exchange',
            data: [],
            backgroundColor: colors.volume,
            id: 'bridges', // key to access theses data in original_data map for updates
        }, ]
    }
});

charts.get("bridgeCrossChainDailyVar").chart = new Chart("bridgeCrossChainDailyVar", {
    type: 'line',
    options: graphVolumesOptions,
    data: {
        labels: [],
        datasets: [{
            label: 'Daily volume of bridges/crosschainswaps on rubic.exchange',
            data: [],
            backgroundColor: colors.volume,
            id: 'var_bridges', // key to access theses data in original_data map for updates
        }, ]
    }
});

charts.get("totalVolume").chart = new Chart("totalVolume", {
    type: 'line',
    options: {
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    display: true,
                    color: "#888888",
                },
            }],
            yAxes: [{
                display: true,
                stacked: true,
                gridLines: {
                    display: true,
                    color: "#888888",
                },
                ticks: {
                    callback: (value, index, values) => {
                        return new Intl.NumberFormat('en-US', {
                            style: 'decimal'
                        }).format(value);
                    }
                },
            }]
        }
    },
    data: {
        labels: [],
        datasets: [
            {
                label: 'Cumulated bridges/crosschainswaps volume on rubic.exchange',
                data: [],
                backgroundColor: colors.bridges,
                id: 'bridges',
            },
            {
                label: 'Cumulated swaps volume on rubic.exchange',
                data: [],
                backgroundColor: colors.swaps,
                id: 'instant_trades',
            },

        ],
    }
});

charts.get("totalVolumeVar").chart = new Chart("totalVolumeVar", {
    type: 'line',
    options: {
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    display: true,
                    color: "#888888",
                },
            }],
            yAxes: [{
                display: true,
                stacked: true,
                gridLines: {
                    display: true,
                    color: "#888888",
                },
                ticks: {
                    callback: (value, index, values) => {
                        return new Intl.NumberFormat('en-US', {
                            style: 'decimal'
                        }).format(value);
                    }
                },
            }]
        }
    },
    data: {
        labels: [],
        datasets: [
            {
                label: 'Daily volume of bridges/crosschainswaps on rubic.exchange',
                data: [],
                backgroundColor: colors.bridges,
                id: 'var_bridges',
            },
            {
                label: 'Daily volume of swaps on rubic.exchange',
                data: [],
                backgroundColor: colors.swaps,
                id: 'var_instant_trades',
            },

        ],
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

    if (charts.get(chartCanvasId).chart.options.scales.yAxes[0].stacked) {
        //const numbers = charts.get(chartCanvasId).chart.data.datasets[0].data;
        //const getMin = (numbers) => numbers.reduce((a, b) => Math.min(a, b));
        //const min = getMin(numbers);
        //console.log(charts.get(chartCanvasId).chart.options.scales.yAxes);
        //charts.get(chartCanvasId).chart.options.scales.yAxes[0].ticks.stepSize = 10;
        //charts.get(chartCanvasId).chart.options.scales.yAxes[0].ticks.min = round(min, 10);

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
            if (field == "date") {
                let options = {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                };
                original_data.set(field, rawrubicmetrics.data.map(function(d) {
                    date = new Date(d[field]);
                    return date.toLocaleDateString('en-US', options);
                }));
            } else {
                original_data.set(field, rawrubicmetrics.data.map(function(d) {
                    return d[field];
                }));
            }
        }

        // filling the charts
        for (let chartCanvasId of listCharts) {
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
            if (chartCanvasId.includes("Var")) {
                selectRangeFromNow(chartCanvasId, 14)
            } else {
                selectRangeFromNow(chartCanvasId, 30)
            }

            charts.get(chartCanvasId).chart.update();
        }

    }
});