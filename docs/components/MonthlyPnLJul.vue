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

// Data from user's image (July 2025)
const rawData = [
  { symbol: 'BABA', realized: 35.0, unrealized: 0 },
  { symbol: 'OKLO', realized: 52.71, unrealized: 0 },
  { symbol: 'META', realized: 0, unrealized: 92 }, // Open position credit
  { symbol: 'LMT', realized: 0, unrealized: 0 }, // Stock holding
  { symbol: 'INTC', realized: 0, unrealized: 0 }, // Stock holding
];

// Computed Totals
const totalRealized = computed(() =>
  rawData.reduce((sum, item) => sum + item.realized, 0)
);
// Note: Unrealized here is just credit received for open options, not MTM
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
const pieOptions = computed(() => ({
  title: {
    text: '盈亏分布 (PnL Distribution)',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
  },
  legend: {
    bottom: 0,
  },
  series: [
    {
      name: 'PnL',
      type: 'pie',
      radius: '50%',
      data: rawData
        .map((item) => ({
          value: item.realized + item.unrealized,
          name: item.symbol,
        }))
        .filter((item) => item.value !== 0)
        .sort((a, b) => b.value - a.value),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}));

const barOptions = computed(() => ({
  title: {
    text: '各标的盈亏 (PnL by Symbol)',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: rawData.map((item) => item.symbol),
    axisLabel: { interval: 0, rotate: 45 },
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Realized',
      type: 'bar',
      stack: 'total',
      data: rawData.map((item) => item.realized),
      itemStyle: { color: '#4caf50' },
    },
    {
      name: 'Unrealized (Credit)',
      type: 'bar',
      stack: 'total',
      data: rawData.map((item) => item.unrealized),
      itemStyle: { color: '#2196f3' },
    },
  ],
}));
</script>

<template>
  <div class="pnl-dashboard">
    <div class="summary-cards">
      <div class="card total">
        <h3>Total PnL</h3>
        <p :class="{ positive: netTotal >= 0, negative: netTotal < 0 }">
          {{ formatCurrency(netTotal) }}
        </p>
      </div>
      <div class="card realized">
        <h3>Realized</h3>
        <p
          :class="{ positive: totalRealized >= 0, negative: totalRealized < 0 }"
        >
          {{ formatCurrency(totalRealized) }}
        </p>
      </div>
      <div class="card unrealized">
        <h3>Unrealized (Credit)</h3>
        <p
          :class="{
            positive: totalUnrealized >= 0,
            negative: totalUnrealized < 0,
          }"
        >
          {{ formatCurrency(totalUnrealized) }}
        </p>
      </div>
    </div>

    <div class="charts-container">
      <div class="chart-wrapper">
        <v-chart class="chart" :option="pieOptions" autoresize />
      </div>
      <div class="chart-wrapper">
        <v-chart class="chart" :option="barOptions" autoresize />
      </div>
    </div>

    <div class="details-table">
      <h3>详细数据 (Details)</h3>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Realized</th>
            <th>Unrealized (Credit)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in rawData" :key="item.symbol">
            <td>{{ item.symbol }}</td>
            <td
              :class="{
                positive: item.realized > 0,
                negative: item.realized < 0,
              }"
            >
              {{ formatCurrency(item.realized) }}
            </td>
            <td
              :class="{
                positive: item.unrealized > 0,
                negative: item.unrealized < 0,
              }"
            >
              {{ formatCurrency(item.unrealized) }}
            </td>
            <td
              :class="{
                positive: item.realized + item.unrealized > 0,
                negative: item.realized + item.unrealized < 0,
              }"
            >
              {{ formatCurrency(item.realized + item.unrealized) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.pnl-dashboard {
  font-family: sans-serif;
  max-width: 1200px;
  margin: 0 auto;
}

.summary-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: space-around;
}

.card {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 1rem;
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
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.chart-wrapper {
  flex: 1;
  min-width: 300px;
  height: 400px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}

.details-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 12px;
  text-align: right;
  border-bottom: 1px solid #eee;
}

th:first-child,
td:first-child {
  text-align: left;
}

th {
  background-color: #f9f9f9;
  font-weight: 600;
}
</style>
