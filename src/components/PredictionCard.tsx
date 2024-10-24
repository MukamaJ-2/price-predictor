import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CryptoInfo {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

interface PredictionCardProps {
  cryptoInfo: CryptoInfo;
  currentPrice: number;
  predictedPrice: number;
}

export default function PredictionCard({
  cryptoInfo,
  currentPrice,
  predictedPrice
}: PredictionCardProps) {
  const percentageChange = ((predictedPrice - currentPrice) / currentPrice) * 100;
  const isPositive = percentageChange > 0;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={cryptoInfo.image}
          alt={cryptoInfo.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{cryptoInfo.name}</h3>
          <p className="text-sm text-gray-500">{cryptoInfo.symbol.toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Current Price</p>
          <p className="text-xl font-bold text-gray-900">
            ${currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Predicted Price</p>
          <p className="text-xl font-bold text-gray-900">
            ${predictedPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Predicted Change</p>
          <div
            className={`flex items-center ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-5 h-5 mr-1" />
            ) : (
              <ArrowDownRight className="w-5 h-5 mr-1" />
            )}
            <span className="text-lg font-semibold">
              {Math.abs(percentageChange).toFixed(2)}%
            </span>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          This prediction is based on historical price trends and should not be considered as financial advice.
        </p>
      </div>
    </div>
  );
}