import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
    {
        date: "Oct 05",
        pureETH: 0,
        Based: 0,
    },
    {
        date: "Oct 12",
        pureETH: -3.44,
        Based: 3.56,
    },
    {
        date: "Oct 19",
        pureETH: -3.38,
        Based: 3.68,
    },
    {
        date: "Oct 26",
        pureETH: 14.21,
        Based: 6.7,
    },
    {
        date: "Nov 02",
        pureETH: 15.01,
        Based: 6.79,
    },
    {
        date: "Nov 09",
        pureETH: -11.34,
        Based: -2.4,
    },
    {
        date: "Nov 16",
        pureETH: -8.66,
        Based: 1.45,
    },
    {
        date: "Nov 23",
        pureETH: -12.81,
        Based: 1.46,
    },
    {
        date: "Nov 30",
        pureETH: -6,
        Based: 4.13,
    },
    {
        date: "Dec 07",
        pureETH: -8.67,
        Based: 3.64,
    },
    {
        date: "Dec 14",
        pureETH: -1.71,
        Based: 5.27,
    },
    {
        date: "Dec 21",
        pureETH: -9.56,
        Based: 2.83,
    },
    {
        date: "Dec 28",
        pureETH: -11.16,
        Based: 2.5,
    },
    {
        date: "Jan 04",
        pureETH: -7.21,
        Based: 3.48,
    },
    {
        date: "Jan 11",
        pureETH: -0.76,
        Based: 4.78,
    },
    {
        date: "Jan 18",
        pureETH: 16.88,
        Based: 7.71,
    },
    {
        date: "Jan 25",
        pureETH: 14.94,
        Based: 7.43,
    },
    {
        date: "Feb 01",
        pureETH: 17.06,
        Based: 8.2,
    },
    {
        date: "Feb 08",
        pureETH: 24.16,
        Based: 9.82,
    },
    {
        date: "Feb 15",
        pureETH: 15.66,
        Based: 7.79,
    },
    {
        date: "Feb 22",
        pureETH: 22.09,
        Based: 9.33,
    },
    {
        date: "Mar 01",
        pureETH: 23.03,
        Based: 9.61,
    },
    {
        date: "Mar 08",
        pureETH: 15.82,
        Based: 7.95,
    },
    {
        date: "Mar 15",
        pureETH: 25.37,
        Based: 9.72,
    },
    {
        date: "Mar 22",
        pureETH: 33.37,
        Based: 12.99,
    },
    {
        date: "Mar 29",
        pureETH: 34.51,
        Based: 14.41,
    },
    {
        date: "Apr 05",
        pureETH: 42.09,
        Based: 15.87,
    },
    {
        date: "Apr 12",
        pureETH: 39.23,
        Based: 15.13,
    },
    {
        date: "Apr 19",
        pureETH: 46.88,
        Based: 16.53,
    },
    {
        date: "Apr 26",
        pureETH: 42.41,
        Based: 16.02,
    },
    {
        date: "May 03",
        pureETH: 38.68,
        Based: 15.77,
    },
    {
        date: "May 10",
        pureETH: 36.94,
        Based: 15.43,
    },
    {
        date: "May 17",
        pureETH: 34.09,
        Based: 14.81,
    },
    {
        date: "May 24",
        pureETH: 34.94,
        Based: 15.03,
    },
    {
        date: "May 31",
        pureETH: 38.64,
        Based: 15.65,
    },
    {
        date: "Jun 07",
        pureETH: 38.06,
        Based: 15.38,
    },
    {
        date: "Jun 14",
        pureETH: 29.69,
        Based: 13.34,
    },
    {
        date: "Jun 21",
        pureETH: 34.63,
        Based: 14.29,
    },
    {
        date: "Jun 28",
        pureETH: 38.41,
        Based: 15.02,
    },
    {
        date: "Jul 05",
        pureETH: 41.89,
        Based: 15.68,
    },
    {
        date: "Jul 12",
        pureETH: 40.21,
        Based: 15.25,
    },
    {
        date: "Jul 19",
        pureETH: 41.86,
        Based: 15.48,
    },
    {
        date: "Jul 26",
        pureETH: 37.5,
        Based: 14.48,
    },
    {
        date: "Aug 02",
        pureETH: 37.93,
        Based: 14.47,
    },
    {
        date: "Aug 09",
        pureETH: 38.38,
        Based: 14.43,
    },
    {
        date: "Aug 16",
        pureETH: 35.44,
        Based: 13.67,
    },
    {
        date: "Aug 23",
        pureETH: 22.06,
        Based: 10.1,
    },
    {
        date: "Aug 30",
        pureETH: 27.73,
        Based: 11.04,
    },
    {
        date: "Sep 06",
        pureETH: 21.21,
        Based: 9.65,
    },
    {
        date: "Sep 13",
        pureETH: 18.77,
        Based: 9.1,
    },
    {
        date: "Sep 20",
        pureETH: 20.98,
        Based: 9.58,
    },
    {
        date: "Sep 27",
        pureETH: 20,
        Based: 9.32,
    },
    {
        date: "Oct 04",
        pureETH: 22.35,
        Based: 9.69,
    },
    {
        date: "Oct 11",
        pureETH: 17.05,
        Based: 8.35,
    },
    {
        date: "Oct 18",
        pureETH: 17.49,
        Based: 8.4,
    },
    {
        date: "Oct 25",
        pureETH: 32.41,
        Based: 10.81,
    },
    {
        date: "Nov 01",
        pureETH: 33.36,
        Based: 11.12,
    },
    {
        date: "Nov 08",
        pureETH: 40.19,
        Based: 12.39,
    },
    {
        date: "Nov 15",
        pureETH: 47.81,
        Based: 13.61,
    },
    {
        date: "Nov 22",
        pureETH: 50.57,
        Based: 14.2,
    },
    {
        date: "Nov 29",
        pureETH: 52.2,
        Based: 14.64,
    },
    {
        date: "Dec 06",
        pureETH: 69.08,
        Based: 17.04,
    },
    {
        date: "Dec 13",
        pureETH: 61.69,
        Based: 15.78,
    },
    {
        date: "Dec 20",
        pureETH: 65.03,
        Based: 16.35,
    },
    {
        date: "Dec 27",
        pureETH: 69.25,
        Based: 17.31,
    },
    {
        date: "Jan 03",
        pureETH: 75.69,
        Based: 18.32,
    },
    {
        date: "Jan 10",
        pureETH: 78.49,
        Based: 18.95,
    },
    {
        date: "Jan 17",
        pureETH: 89.39,
        Based: 21.02,
    },
    {
        date: "Jan 24",
        pureETH: 67.4,
        Based: 17,
    },
    {
        date: "Jan 31",
        pureETH: 69.62,
        Based: 17.8,
    },
    {
        date: "Feb 07",
        pureETH: 74.84,
        Based: 18.65,
    },
    {
        date: "Feb 14",
        pureETH: 104.52,
        Based: 21.87,
    },
    {
        date: "Feb 21",
        pureETH: 116.72,
        Based: 23.84,
    },
    {
        date: "Feb 28",
        pureETH: 148.55,
        Based: 27.37,
    },
    {
        date: "Mar 06",
        pureETH: 185.17,
        Based: 30.9,
    },
    {
        date: "Mar 13",
        pureETH: 201.55,
        Based: 32.37,
    },
    {
        date: "Mar 20",
        pureETH: 139.73,
        Based: 24.22,
    },
    {
        date: "Mar 27",
        pureETH: 165.96,
        Based: 28.77,
    },
    {
        date: "Apr 03",
        pureETH: 146.58,
        Based: 26.24,
    },
    {
        date: "Apr 10",
        pureETH: 161.49,
        Based: 28.17,
    },
    {
        date: "Apr 17",
        pureETH: 127.37,
        Based: 22.77,
    },
    {
        date: "Apr 24",
        pureETH: 142.77,
        Based: 25.89,
    },
    {
        date: "May 01",
        pureETH: 114.66,
        Based: 22.53,
    },
    {
        date: "May 08",
        pureETH: 123.26,
        Based: 24.09,
    },
    {
        date: "May 15",
        pureETH: 115.99,
        Based: 22.94,
    },
    {
        date: "May 22",
        pureETH: 177.86,
        Based: 27.59,
    },
    {
        date: "May 29",
        pureETH: 183.75,
        Based: 28.27,
    },
    {
        date: "Jun 05",
        pureETH: 182.08,
        Based: 28.27,
    },
    {
        date: "Jun 12",
        pureETH: 163.14,
        Based: 25.95,
    },
    {
        date: "Jun 19",
        pureETH: 164.26,
        Based: 25.98,
    },
    {
        date: "Jun 26",
        pureETH: 150.55,
        Based: 24.36,
    },
    {
        date: "Jul 03",
        pureETH: 145.76,
        Based: 23.99,
    },
    {
        date: "Jul 10",
        pureETH: 130.47,
        Based: 21.82,
    },
    {
        date: "Jul 17",
        pureETH: 158.71,
        Based: 25.44,
    },
    {
        date: "Jul 24",
        pureETH: 157.82,
        Based: 25.4,
    },
    {
        date: "Jul 31",
        pureETH: 145.65,
        Based: 23.7,
    },
    {
        date: "Aug 07",
        pureETH: 86.53,
        Based: 10.94,
    },
    {
        date: "Aug 14",
        pureETH: 103.92,
        Based: 26.82,
    },
    {
        date: "Aug 21",
        pureETH: 92.29,
        Based: 38.62,
    },
    {
        date: "Aug 28",
        pureETH: 87.43,
        Based: 37.64,
    },
    {
        date: "Sep 04",
        pureETH: 77.5,
        Based: 35.78,
    },
    {
        date: "Sep 11",
        pureETH: 71.99,
        Based: 34.92,
    },
    {
        date: "Sep 18",
        pureETH: 71.3,
        Based: 34.97,
    },
    {
        date: "Sep 25",
        pureETH: 94.77,
        Based: 38.35,
    },
    {
        date: "Oct 02",
        pureETH: 82.08,
        Based: 35.68,
    },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(30,30,30,0.8)",
          padding: "10px",
          border: "1px solid #444",
          borderRadius: "5px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        <p style={{ color: "#fff", marginBottom: "5px" }}>{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: "2px 0" }}>
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
        background: "linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        fontFamily: "Inter, sans-serif",
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
