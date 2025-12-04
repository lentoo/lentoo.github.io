import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Biubiu Trader',
  base: '/',
  description: 'Cyberpunk Style Trading Journal',
  appearance: true,

  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap',
      },
    ],
  ],

  themeConfig: {
    nav: [
      { text: 'Dashboard', link: '/' },
      { text: 'Daily Ops', link: '/daily-ops/' },
      { text: 'Analysis', link: '/market-analysis/2025-11-pnl/' },
      { text: 'Mindset', link: '/mindset/' },
    ],

    sidebar: {
      '/daily-ops/': [
        {
          text: '实盘日记',
          items: [{ text: '操作原则', link: '/daily-ops/' }],
        },
        {
          text: '2025年11月',
          collapsed: true,
          items: [
            { text: '11-26 TLT 再次布局', link: '/daily-ops/2025-11-26' },
            {
              text: '11-25 GLD 卖权与 BABA 止盈',
              link: '/daily-ops/2025-11-25',
            },
            {
              text: '11-24 BABA 做空与 TLT 平仓',
              link: '/daily-ops/2025-11-24',
            },
            { text: '11-21 CONL & NVDA', link: '/daily-ops/2025-11-21' },
            { text: '11-20 SPY 期权', link: '/daily-ops/2025-11-20' },
            { text: '11-19 YINN & NVDA', link: '/daily-ops/2025-11-19' },
            { text: '11-18 SPY 价差', link: '/daily-ops/2025-11-18' },
            { text: '11-14 NVDA 行权', link: '/daily-ops/2025-11-14' },
            { text: '11-13 GLD & NVDA', link: '/daily-ops/2025-11-13' },
            { text: '11-12 BABA 价差', link: '/daily-ops/2025-11-12' },
            { text: '11-11 NVDA 价差', link: '/daily-ops/2025-11-11' },
            { text: '11-06 AMD & NVDA', link: '/daily-ops/2025-11-06' },
            { text: '11-05 NVDA 建仓', link: '/daily-ops/2025-11-05' },
            { text: '11-04 AMD & CONL', link: '/daily-ops/2025-11-04' },
            { text: '11-03 TLT 抄底', link: '/daily-ops/2025-11-03' },
          ],
        },
        {
          text: '2025年10月',
          collapsed: true,
          items: [
            { text: '10-29 MSFT 财报布局', link: '/daily-ops/2025-10-29' },
            {
              text: '10-28 YINN 卖权与 TLT 布局',
              link: '/daily-ops/2025-10-28',
            },
            { text: '10-27 GLD 卖权策略', link: '/daily-ops/2025-10-27' },
            { text: '10-24 NFLX 行权止损', link: '/daily-ops/2025-10-24' },
            {
              text: '10-23 TSLA 平仓与 NFLX 指派',
              link: '/daily-ops/2025-10-23',
            },
            {
              text: '10-22 NFLX 财报博弈与 TSLA',
              link: '/daily-ops/2025-10-22',
            },
            { text: '10-21 NFLX 财报前布局', link: '/daily-ops/2025-10-21' },
            { text: '10-20 AAPL 稳健策略', link: '/daily-ops/2025-10-20' },
            {
              text: '10-16 TLT 加仓与 GLD 止盈',
              link: '/daily-ops/2025-10-16',
            },
            {
              text: '10-15 AVGO & AMD 芯片股策略',
              link: '/daily-ops/2025-10-15',
            },
            { text: '10-14 SPXW 日内交易', link: '/daily-ops/2025-10-14' },
            {
              text: '10-13 LMT 止盈与 CONL 建仓',
              link: '/daily-ops/2025-10-13',
            },
            {
              text: '10-10 TLT 布局与 VALE 远期',
              link: '/daily-ops/2025-10-10',
            },
            { text: '10-09 GLD 卖权策略', link: '/daily-ops/2025-10-09' },
            { text: '10-08 AAPL 布局', link: '/daily-ops/2025-10-08' },
          ],
        },
      ],
      '/market-analysis/': [
        {
          text: '市场研判',
          items: [
            { text: '11月盈亏分析', link: '/market-analysis/2025-11-pnl' },
            { text: '10月盈亏分析', link: '/market-analysis/2025-10-pnl' },
            { text: 'BTC 长期走势', link: '/market-analysis/btc-long-term' },
          ],
        },
      ],
      '/mindset/': [
        {
          text: '交易心法',
          items: [{ text: '情绪管理', link: '/mindset/' }],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com' }],

    footer: {
      message: 'Trade safe. Stay humble.',
      copyright: 'Copyright © 2025 Biubiu Trader',
    },
  },
});
