import React from 'react';

interface CryptoInfo {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

interface CryptoSelectorProps {
  cryptoList: CryptoInfo[];
  selectedCrypto: string;
  onSelect: (cryptoId: string) => void;
}

export default function CryptoSelector({
  cryptoList,
  selectedCrypto,
  onSelect
}: CryptoSelectorProps) {
  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="crypto-select" className="text-sm font-medium text-gray-700">
        Select Cryptocurrency:
      </label>
      <select
        id="crypto-select"
        value={selectedCrypto}
        onChange={(e) => onSelect(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {cryptoList.map((crypto) => (
          <option key={crypto.id} value={crypto.id}>
            {crypto.name} ({crypto.symbol.toUpperCase()})
          </option>
        ))}
      </select>
    </div>
  );
}