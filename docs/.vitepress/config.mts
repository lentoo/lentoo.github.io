import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Biubiu Trader',
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
      { text: 'Analysis', link: '/market-analysis/' },
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
          items: [
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
      ],
      '/market-analysis/': [
        {
          text: '市场研判',
          items: [
            { text: '10月盈亏分析', link: '/market-analysis/2025-10-pnl' },
            { text: '分析框架', link: '/market-analysis/' },
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
