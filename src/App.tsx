import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, RefreshCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import PredictionCard from './components/PredictionCard';
import CryptoSelector from './components/CryptoSelector';

interface PriceData {
  prices: [number, number][];
}

interface CryptoInfo {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

function App() {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cryptoList, setCryptoList] = useState<CryptoInfo[]>([]);

  useEffect(() => {
    fetchCryptoList();
  }, []);

  useEffect(() => {
    if (selectedCrypto) {
      fetchHistoricalData();
    }
  }, [selectedCrypto]);

  const fetchCryptoList = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20,
            page: 1,
            sparkline: false
          }
        }
      );
      setCryptoList(response.data);
    } catch (err) {
      setError('Failed to fetch cryptocurrency list');
    }
  };

  const fetchHistoricalData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get<PriceData>(
        `https://api.coingecko.com/api/v3/coins/${selectedCrypto}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: 30,
            interval: 'daily'
          }
        }
      );

      const formattedData = response.data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price: price
      }));

      setHistoricalData(formattedData);
      makePrediction(formattedData);
    } catch (err) {
      setError('Failed to fetch historical data');
    } finally {
      setLoading(false);
    }
  };

  const makePrediction = (data: any[]) => {
    // Simple linear regression
    const n = data.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const y = data.map(d => d.price);

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, curr, i) => acc + curr * y[i], 0);
    const sumXX = x.reduce((acc, curr) => acc + curr * curr, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Predict next day's price
    const nextDayPrediction = slope * n + intercept;
    setPrediction(nextDayPrediction);
  };

  const selectedCryptoInfo = cryptoList.find(crypto => crypto.id === selectedCrypto);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Crypto Price Predictor</h1>
          </div>
          <p className="text-gray-600">
            Analyze historical data and predict cryptocurrency prices using machine learning
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <CryptoSelector
              cryptoList={cryptoList}
              selectedCrypto={selectedCrypto}
              onSelect={setSelectedCrypto}
            />
            <button
              onClick={fetchHistoricalData}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh Data
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              <div className="h-64 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      domain={['auto', 'auto']}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {selectedCryptoInfo && prediction && (
                <PredictionCard
                  cryptoInfo={selectedCryptoInfo}
                  currentPrice={historicalData[historicalData.length - 1]?.price}
                  predictedPrice={prediction}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;