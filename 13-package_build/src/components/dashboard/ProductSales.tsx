import Chart from 'react-apexcharts';
import CardBox from '../shared/CardBox';
import { IconArrowDownLeft, IconCurrencyDollar } from '@tabler/icons-react';

const ProductSales = () => {
  const ChartData: any = {
    chart: {
      type: 'area',
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
      fontFamily: "Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
    },
    series: [
      {
        name: 'Earnings',
        color: '#49BEFF',
        data: [25, 66, 20, 40, 12, 58, 20],
      },
    ],
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: ['var(--color-primary)'],
      type: 'solid',
      opacity: 0.05,
    },

    markers: {
      size: 0,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: true,
        position: 'right',
      },
      x: {
        show: false,
      },
    },
  };
  return (
    <>
      <CardBox className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h5 className="card-title">Product Sales</h5>
            <span className="h-11 w-11 rounded-full bg-error text-white flex justify-center items-center">
              <IconCurrencyDollar size={20} />
            </span>
          </div>

          <h3 className="text-[20px] ">$6,820</h3>
          <div className="flex items-items-center mt-3 gap-2">
            <span className="h-6 w-6 rounded-full bg-error/20 flex justify-center items-center">
              <IconArrowDownLeft className="text-error " size={15} />
            </span>
            <p className="text-dark text-sm mb-0">+9%</p>
            <p className="text-sm mb-0 text-dark/50">last year</p>
          </div>
        </div>

        <Chart
          options={ChartData}
          series={ChartData.series}
          type="area"
          height="60px"
          width="100%"
        />
      </CardBox>
    </>
  );
};

export default ProductSales;
