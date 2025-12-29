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
          text: '2025年12月',
          collapsed: true,
          items: [
            { text: '12-26 SLV 交易', link: '/daily-ops/2025-12-26' },
            { text: '12-24 SPXW & SLV', link: '/daily-ops/2025-12-24' },
            { text: '12-23 TLT & SLV', link: '/daily-ops/2025-12-23' },
            { text: '12-22 TSLA & GLD', link: '/daily-ops/2025-12-22' },
            {
              text: '12-19 TLT 指派与 SPXW 结算',
              link: '/daily-ops/2025-12-19',
            },
            { text: '12-18 多头寸止盈', link: '/daily-ops/2025-12-18' },
            { text: '12-17 SLV 布局', link: '/daily-ops/2025-12-17' },
            { text: '12-16 IBKR 加仓', link: '/daily-ops/2025-12-16' },
            { text: '12-15 MSTR 看空', link: '/daily-ops/2025-12-15' },
            { text: '12-12 SPY 止盈与 UVXY', link: '/daily-ops/2025-12-12' },
            { text: '12-11 UVXY 卖权', link: '/daily-ops/2025-12-11' },
            { text: '12-10 GLD 布局', link: '/daily-ops/2025-12-10' },
            {
              text: '12-09 BIDU 止盈与 SPY 布局',
              link: '/daily-ops/2025-12-09',
            },
            { text: '12-08 BIDU 看空', link: '/daily-ops/2025-12-08' },
            { text: '12-05 GLD 策略', link: '/daily-ops/2025-12-05' },
            { text: '12-04 TSLA 卖权', link: '/daily-ops/2025-12-04' },
            { text: '12-03 SPY 日内', link: '/daily-ops/2025-12-03' },
            { text: '12-01 NVDA 与 VALE', link: '/daily-ops/2025-12-01' },
          ],
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
        {
          text: '2025年9月',
          collapsed: true,
          items: [
            { text: '09-30 BABA 策略调整', link: '/daily-ops/2025-09-30' },
            { text: '09-29 INTC 看空策略', link: '/daily-ops/2025-09-29' },
            { text: '09-25 BABA 布局', link: '/daily-ops/2025-09-25' },
            { text: '09-23 TLT 与 AAPL 布局', link: '/daily-ops/2025-09-23' },
            { text: '09-18 INTC 策略', link: '/daily-ops/2025-09-18' },
            { text: '09-17 SMR 建仓与 NVDA', link: '/daily-ops/2025-09-17' },
            { text: '09-16 TSLA 看空', link: '/daily-ops/2025-09-16' },
            { text: '09-15 AAPL 策略', link: '/daily-ops/2025-09-15' },
            { text: '09-10 TMF 调整', link: '/daily-ops/2025-09-10' },
            { text: '09-09 GLD 黄金策略', link: '/daily-ops/2025-09-09' },
            { text: '09-08 SLV 与 TLT', link: '/daily-ops/2025-09-08' },
            { text: '09-05 UNH 与 INTC', link: '/daily-ops/2025-09-05' },
            { text: '09-04 USO 原油', link: '/daily-ops/2025-09-04' },
            { text: '09-03 AAPL 与 TLT', link: '/daily-ops/2025-09-03' },
            { text: '09-02 GLD 与 NVDA', link: '/daily-ops/2025-09-02' },
          ],
        },
        {
          text: '2025年8月',
          collapsed: true,
          items: [
            { text: '08-26 IBKR 与 LMT 止盈', link: '/daily-ops/2025-08-26' },
            { text: '08-20 AAPL 加仓', link: '/daily-ops/2025-08-20' },
            { text: '08-19 INTC 与 UNH', link: '/daily-ops/2025-08-19' },
            { text: '08-14 AAPL 与 BABA 止盈', link: '/daily-ops/2025-08-14' },
            { text: '08-13 YINN 中概股', link: '/daily-ops/2025-08-13' },
            { text: '08-12 GLD 黄金', link: '/daily-ops/2025-08-12' },
            { text: '08-07 AMD 平仓与 BABA', link: '/daily-ops/2025-08-07' },
            {
              text: '08-06 INTC 止盈与 AMD 调整',
              link: '/daily-ops/2025-08-06',
            },
            { text: '08-05 AMD 布局', link: '/daily-ops/2025-08-05' },
            { text: '08-04 INTC 卖权', link: '/daily-ops/2025-08-04' },
            { text: '08-01 META 止盈', link: '/daily-ops/2025-08-01' },
          ],
        },
        {
          text: '2025年7月',
          collapsed: true,
          items: [
            { text: '07-30 META 看空', link: '/daily-ops/2025-07-30' },
            { text: '07-28 BABA 止盈', link: '/daily-ops/2025-07-28' },
            { text: '07-24 BABA 卖权', link: '/daily-ops/2025-07-24' },
            { text: '07-22 LMT 建仓', link: '/daily-ops/2025-07-22' },
            { text: '07-18 INTC 建仓', link: '/daily-ops/2025-07-18' },
            { text: '07-16 OKLO 止盈', link: '/daily-ops/2025-07-16' },
            { text: '07-07 OKLO 建仓', link: '/daily-ops/2025-07-07' },
          ],
        },
      ],
      '/market-analysis/': [
        {
          text: '市场研判',
          items: [
            { text: '11月盈亏分析', link: '/market-analysis/2025-11-pnl' },
            { text: '10月盈亏分析', link: '/market-analysis/2025-10-pnl' },
            { text: '9月盈亏分析', link: '/market-analysis/2025-09-pnl' },
            { text: '8月盈亏分析', link: '/market-analysis/2025-08-pnl' },
            { text: '7月盈亏分析', link: '/market-analysis/2025-07-pnl' },
            { text: 'BTC 长期走势', link: '/market-analysis/btc-long-term' },
            { text: '美债（TLT） 长期走势', link: '/market-analysis/tlt' },
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
