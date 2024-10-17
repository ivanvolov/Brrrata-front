import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const performanceData = [
  {
    date: 'Oct 05',
    pureETH: 0,
    Based: 0,
  },
  {
    date: 'Oct 12',
    pureETH: -3.44,
    Based: 3.56,
  },
  {
    date: 'Oct 19',
    pureETH: -3.38,
    Based: 3.68,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'rgba(30,30,30,0.8)',
          padding: '10px',
          border: '1px solid #444',
          borderRadius: '5px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        <p style={{ color: '#fff', marginBottom: '5px' }}>{`${label}`}</p>
        {payload.map((entry: any, index: any) => (
          <p key={index} style={{ color: entry.color, margin: '2px 0' }}>
            {`${entry.name}: ${entry.value}%`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PriceChart() {
  return (
    <div
      style={{
        background: 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={performanceData}
          margin={{ top: 20, right: 0, left: -30, bottom: 20 }}
        >
          <defs>
            <linearGradient id="YAP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorStrategy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="date"
            stroke="#888"
            fontSize="12px"
            fontWeight="bold"
            tickMargin={10}
          />
          <YAxis
            stroke="#888"
            fontSize="12px"
            fontWeight="bold"
            domain={[-5, 40]}
            ticks={[0, 10, 20, 30, 40]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="Based"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorStrategy)"
            name="BASED"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
