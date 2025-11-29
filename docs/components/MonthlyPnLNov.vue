<script setup>
import { ref, computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

// Data from user's image (Nov 2025)
const rawData = [
  { symbol: 'BOXX', realized: 0, unrealized: 3.36 },
  { symbol: 'CONL', realized: 0, unrealized: -268.99 },
  { symbol: 'IBKR', realized: 0, unrealized: 21.53 },
  { symbol: 'NVDA', realized: -1242.82 + 123.25 + 105.51, unrealized: 0 }, // Stock + Options
  { symbol: 'AMD', realized: 74.57, unrealized: 0 },
  { symbol: 'BABA', realized: 103.2 + 167.21, unrealized: 0 },
  { symbol: 'GLD', realized: 106.97 + 420.03, unrealized: 170.31 },
  { symbol: 'SPY', realized: 265.21 + 69.06, unrealized: 0 },
  { symbol: 'TLT', realized: 72.37, unrealized: 2.98 },
  { symbol: 'VALE', realized: 0, unrealized: 18.17 },
  { symbol: 'YINN', realized: 327.12, unrealized: 0 },
];

// Computed Totals
const totalRealized = computed(() =>
  rawData.reduce((sum, item) => sum + item.realized, 0)
);
const totalUnrealized = computed(() =>
  rawData.reduce((sum, item) => sum + item.unrealized, 0)
);
const netTotal = computed(() => totalRealized.value + totalUnrealized.value);

// Format Currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

// Chart Options
const pieOption = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
  },
  series: [
    {
      name: 'PnL by Symbol',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold',
        },
      },
      data: rawData
        .map((item) => ({
          value: Math.abs(item.realized + item.unrealized),
          name: item.symbol,
          itemStyle: {
            color: item.realized + item.unrealized >= 0 ? '#00ff41' : '#ff0055',
          },
        }))
        .sort((a, b) => b.value - a.value),
    },
  ],
}));

const barOption = computed(() => {
  const sortedData = [...rawData].sort(
    (a, b) => a.realized + a.unrealized - (b.realized + b.unrealized)
  );
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const p = Array.isArray(params) ? params[0] : params;
        return `${p.name}<br/>${p.seriesName}: ${formatCurrency(p.value)}`;
      },
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'value',
      splitNumber: 6,
      axisLabel: {
        formatter: (value) => {
          try {
            return new Intl.NumberFormat('en-US', {
              notation: 'compact',
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 1,
            }).format(value);
          } catch (e) {
            return formatCurrency(value);
          }
        },
      },
    },
    yAxis: {
      type: 'category',
      data: sortedData.map((item) => item.symbol),
      axisTick: { alignWithLabel: true },
    },
    series: [
      {
        name: 'Net PnL',
        type: 'bar',
        barWidth: '60%',
        data: sortedData.map((item) => {
          const val = item.realized + item.unrealized;
          return {
            value: val,
            itemStyle: { color: val >= 0 ? '#00ff41' : '#ff0055' },
          };
        }),
      },
    ],
  };
});

const lineOption = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  },
  yAxis: { type: 'value' },
  series: [
    {
      data: [0, 150, 300, 539.04], // Simulated curve ending at total net
      type: 'line',
      smooth: true,
      lineStyle: { color: '#00f3ff', width: 3 },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(0, 243, 255, 0.5)' },
            { offset: 1, color: 'rgba(0, 243, 255, 0)' },
          ],
        },
      },
    },
  ],
}));

// Table Data
const tableData = computed(() => {
  const totalAbs = rawData.reduce(
    (sum, item) => sum + Math.abs(item.realized + item.unrealized),
    0
  );
  return rawData
    .map((item) => {
      const total = item.realized + item.unrealized;
      return {
        ...item,
        total,
        percentage: totalAbs
          ? ((Math.abs(total) / totalAbs) * 100).toFixed(2) + '%'
          : '0%',
      };
    })
    .sort((a, b) => b.total - a.total);
});
</script>

<template>
  <div class="pnl-dashboard">
    <div class="summary-cards">
      <div class="card">
        <h3>Realized P/L</h3>
        <p :class="totalRealized >= 0 ? 'positive' : 'negative'">
          {{ formatCurrency(totalRealized) }}
        </p>
      </div>
      <div class="card">
        <h3>Unrealized P/L</h3>
        <p :class="totalUnrealized >= 0 ? 'positive' : 'negative'">
          {{ formatCurrency(totalUnrealized) }}
        </p>
      </div>
      <div class="card">
        <h3>Net Total</h3>
        <p :class="netTotal >= 0 ? 'positive' : 'negative'">
          {{ formatCurrency(netTotal) }}
        </p>
      </div>
    </div>

    <div class="charts-container">
      <div class="chart-wrapper">
        <v-chart
          class="chart"
          :option="pieOption"
          autoresize
          style="height: 400px"
        />
      </div>
      <div class="chart-wrapper">
        <v-chart
          class="chart"
          :option="barOption"
          autoresize
          style="height: 400px"
        />
      </div>
    </div>

    <div class="chart-wrapper" style="width: 100%; margin-top: 30px">
      <v-chart
        class="chart"
        :option="lineOption"
        autoresize
        style="height: 400px"
      />
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Realized P/L</th>
            <th>Unrealized P/L</th>
            <th>Total P/L</th>
            <th>Impact %</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData" :key="item.symbol">
            <td>{{ item.symbol }}</td>
            <td :class="item.realized >= 0 ? 'positive' : 'negative'">
              {{ formatCurrency(item.realized) }}
            </td>
            <td :class="item.unrealized >= 0 ? 'positive' : 'negative'">
              {{ formatCurrency(item.unrealized) }}
            </td>
            <td :class="item.total >= 0 ? 'positive' : 'negative'">
              {{ formatCurrency(item.total) }}
            </td>
            <td>{{ item.percentage }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  margin-top: 30px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  padding: 12px 15px;
  text-align: right;
  border-bottom: 1px solid var(--vp-c-divider);
}

th:first-child,
td:first-child {
  text-align: left;
}

th {
  background-color: var(--vp-c-bg-mute);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

tr:last-child td {
  border-bottom: none;
}

tr:hover {
  background-color: var(--vp-c-bg-mute);
}

.pnl-dashboard {
  margin-top: 2rem;
}

.summary-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  flex: 1;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  text-align: center;
}

.card h3 {
  margin: 0 0 10px 0;
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

.card p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.positive {
  color: #4caf50;
}

.negative {
  color: #f44336;
}

.charts-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.chart-wrapper {
  height: 400px;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
}

.chart {
  height: 400px;
  width: 100%;
}

@media (min-width: 768px) {
  .charts-container {
    flex-direction: row;
  }
  .chart-wrapper {
    width: 50%;
  }
}
</style>
