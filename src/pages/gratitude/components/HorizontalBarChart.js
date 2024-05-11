import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

// chart options
const barChartOptions = {
    chart: {
        type: 'bar',
        height: 365,
        width: 600,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            distributed: true,
            columnWidth: '45%',
            borderRadius: 4,
            horizontal: true
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    xaxis: {
        categories: [],
        colors: ['#6e00ff'],
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        show: true
    },
    grid: {
        show: false
    }
};

HorizontalBarChart.propTypes = {
    data: PropTypes.array
};

function HorizontalBarChart({ data }) {
    const [options, setOptions] = useState(barChartOptions);
    const [series, setSeries] = useState([{ data: [] }]);
    const [categories, setCategories] = useState([]);
    console.log(data);

    useEffect(() => {
        const value = data.map((entry) => entry.value);
        const keys = data.map((entry) => entry.key);
        setSeries([{ data: value }]);
        setCategories(keys);
    }, [data]);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            xaxis: {
                categories: categories
            },
            tooltip: {
                theme: 'light'
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={365} />
        </div>
    );
}

export default HorizontalBarChart;
