import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';

interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface StockDashboardProps {
  onBack: () => void;
}

const StockDashboard: React.FC<StockDashboardProps> = ({ onBack }) => {
  const [stocks, setStocks] = useState<Stock[]>([
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 175.43,
      change: 2.15,
      changePercent: 1.24
    },
    {
      id: '2',
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 2847.92,
      change: -15.67,
      changePercent: -0.55
    },
    {
      id: '3',
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 248.50,
      change: 8.32,
      changePercent: 3.46
    }
  ]);

  // Update stock prices every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          // Generate random price change between -5% and +5%
          const changePercent = (Math.random() - 0.5) * 10; // -5% to +5%
          const priceChange = stock.price * (changePercent / 100);
          const newPrice = Math.max(0.01, stock.price + priceChange); // Ensure price doesn't go negative
          const actualChange = newPrice - stock.price;
          const actualChangePercent = (actualChange / stock.price) * 100;

          return {
            ...stock,
            price: Math.round(newPrice * 100) / 100, // Round to 2 decimal places
            change: Math.round(actualChange * 100) / 100,
            changePercent: Math.round(actualChangePercent * 100) / 100
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}`;
  };

  const formatChangePercent = (changePercent: number) => {
    const sign = changePercent >= 0 ? '+' : '';
    return `${sign}${changePercent.toFixed(2)}%`;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeBgColor = (change: number) => {
    if (change > 0) return 'bg-green-50 border-green-200';
    if (change < 0) return 'bg-red-50 border-red-200';
    return 'bg-gray-50 border-gray-200';
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (change < 0) return <TrendingDown className="w-5 h-5 text-red-600" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад к меню</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Панель акций</h1>
          <p className="text-gray-600">Цены акций в реальном времени (обновление каждые 3 секунды)</p>
        </div>
      </div>

      {/* Stock Cards Grid */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stocks.map((stock) => (
              <div
                key={stock.id}
                className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${getChangeBgColor(stock.change)}`}
              >
                <div className="p-6">
                  {/* Stock Symbol and Name */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{stock.symbol}</h2>
                      <p className="text-sm text-gray-600">{stock.name}</p>
                    </div>
                    {getTrendIcon(stock.change)}
                  </div>

                  {/* Current Price */}
                  <div className="mb-4">
                    <p className="text-4xl font-bold text-gray-900 mb-1">
                      {formatPrice(stock.price)}
                    </p>
                  </div>

                  {/* Price Change */}
                  <div className="flex items-center justify-between">
                    <div className={`text-lg font-semibold ${getChangeColor(stock.change)}`}>
                      {formatChange(stock.change)}
                    </div>
                    <div className={`text-lg font-semibold ${getChangeColor(stock.change)}`}>
                      {formatChangePercent(stock.changePercent)}
                    </div>
                  </div>
                </div>

                {/* Bottom indicator bar */}
                <div className={`h-2 ${stock.change > 0 ? 'bg-green-500' : stock.change < 0 ? 'bg-red-500' : 'bg-gray-400'} rounded-b-xl`}></div>
              </div>
            ))}
          </div>

          {/* Update indicator */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 text-gray-500 text-sm bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Обновления каждые 3 секунды</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDashboard;