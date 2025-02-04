import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

const DEFAULT_CHART_OPTIONS = {
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

const CHART_HEIGHT = 365;

HorizontalBarChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        })
    ).isRequired
};

function HorizontalBarChart({ data }) {
    const [options, setOptions] = useState(DEFAULT_CHART_OPTIONS);
    const [series, setSeries] = useState([{ data: [] }]);

    useEffect(() => {
        const values = data.map(({ value }) => value);
        const categories = data.map(({ key }) => key);

        setSeries([{ data: values }]);
        setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
                ...prevOptions.xaxis,
                categories
            },
            tooltip: {
                theme: 'light'
            }
        }));
    }, [data]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={CHART_HEIGHT} />
        </div>
    );
}

export default HorizontalBarChart;
