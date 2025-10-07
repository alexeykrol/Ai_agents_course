import CardBox from '../shared/CardBox';
import { IconArrowUpLeft } from '@tabler/icons-react';
import Chart from 'react-apexcharts';

const TrafficDistribution = () => {
  const ChartData: any = {
    color: '#adb5bd',
    series: [33, 33, 33],
    labels: ['Other', 'Refferal', 'Oragnic'],
    chart: {
      height: 160,
      type: 'donut',
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '80%',
        },
      },
    },
    stroke: {
      show: true,
      colors: 'var(--color-surface-ld)',
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },
    colors: ['#E7ECF0', 'var(--color-error)', 'var(--color-primary)'],

    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };
  return (
    <>
      <CardBox>
        <div className="flex justify-between items-center">
          <h5 className="card-title">Traffic Distribution</h5>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="md:col-span-7 col-span-12">
            <h3 className="text-[20px] my-4">$36,358</h3>
            <div className="flex items-items-center mb-2 gap-2">
              <span className="h-6 w-6 rounded-full bg-success/20 flex justify-center items-center">
                <IconArrowUpLeft className="text-success " size={15} />
              </span>
              <p className="text-dark text-sm mb-0">+9%</p>
              <p className="text-sm mb-0 text-dark/50">last year</p>
            </div>

            <div className="flex gap-3 items-center">
              <div className="flex gap-3 items-center text-sm text-dark/80">
                <span className="h-[7px] w-[7px] rounded-full bg-primary"></span>Oragnic
              </div>
               <div className="flex gap-3 items-center text-sm text-dark/80">
                <span className="h-[7px] w-[7px] rounded-full bg-error"></span>Refferal
              </div>
            </div>
          </div>
          <div className="md:col-span-5 col-span-12">
             <Chart
            options={ChartData}
            series={ChartData.series}
            type="donut"
            height="160px"
            width="100%"
          />
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default TrafficDistribution;
