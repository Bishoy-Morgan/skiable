import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    TooltipItem,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const priceChartData = {
    labels: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
        {
            label: 'Flight Price ($)',
            data: [320, 310, 295, 340, 330, 310, 300, 315, 325, 335, 320, 310],
            fill: false,
            borderColor: '#FDC830',
            backgroundColor: '#FDC830',
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointHoverBorderColor: '#000000',
        },
    ],
};

const priceChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function(context: TooltipItem<'line'>) {
                    return `$${context.parsed.y}`;
                },
            },
        },
    },
    scales: {
        y: {
            beginAtZero: false,
            ticks: {
                callback: function(value: number | string, index: number) {
                    // Show every other tick label (reduce count)
                    return index % 2 === 0 ? `$${value}` : '';
                },
                color: '#222',
                font: { size: 14 },
                // You can also use maxTicksLimit for more control:
                // maxTicksLimit: 4,
            },
            grid: { color: '#eee' },
        },
        x: {
            ticks: { color: '#222', font: { size: 14 } },
            grid: { color: '#eee' },
        },
    },
};

const PriceChart = () => (
    <div className="w-full max-w-[450px] h-[240px]">
        <Line data={priceChartData} options={priceChartOptions} />
    </div>
);

export default PriceChart;