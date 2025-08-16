import { Link } from 'react-router';
import ProductCards from 'src/components/dashboard/ProductCards';
import ProductSales from 'src/components/dashboard/ProductSales';
import RecentTransactionCard from 'src/components/dashboard/RecentTransactions';
import SalesProfit from 'src/components/dashboard/SalesProfit';
import TopPayingClients from 'src/components/dashboard/TopPayingClients';
import TrafficDistribution from 'src/components/dashboard/TrafficDistribution';

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-8 col-span-12">
          <SalesProfit />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <div className="grid grid-cols-12 ">
            <div className="col-span-12 mb-6">
              <TrafficDistribution />
            </div>
            <div className="col-span-12">
              <ProductSales />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <RecentTransactionCard />
        </div>
        <div className="lg:col-span-8 col-span-12">
          <TopPayingClients />
        </div>
        <div className="col-span-12">
          <ProductCards />
        </div>
      </div>

      <div className="text-center pt-8 ">
        <p className="text-base  text-dark/80">
          Design and Developed by{' '}
          <Link
            to="https://wrappixel.com/"
            target="_blank"
            className="pl-1 text-primary underline decoration-primary"
          >
            wrappixel.com
          </Link>
        </p>
      </div>
    </>
  );
};

export default Dashboard;
