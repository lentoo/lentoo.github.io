const fs = require('fs');
const path = require('path');

const data = {
  '2025-10-29': {
    title: 'MSFT 财报布局',
    trades: [
      {
        symbol: 'MSFT',
        strategy: 'Bull Put Spread',
        contract: '31OCT25 500P / 510P',
        direction: 'LONG/BULLISH',
        items: ['Sell 510 P @ $2.16', 'Buy 500 P @ $0.99'],
        credit: '+$1.17',
        logic:
          '预期 MSFT 财报后股价维持在 $510 以上，卖出虚值 Put Spread 赚取权利金。',
      },
    ],
  },
  '2025-10-28': {
    title: 'YINN 卖权与 TLT 布局',
    trades: [
      {
        symbol: 'YINN',
        strategy: 'Bear Call Spread',
        contract: '21NOV25 53C / 60C',
        direction: 'SHORT/BEARISH',
        items: ['Sell 53 C @ $2.99', 'Buy 60 C @ $1.78'],
        credit: '+$1.21',
        logic: '看空中国资产短期回调，卖出 YINN Call Spread 对冲风险。',
      },
      {
        symbol: 'TLT',
        strategy: 'Bear Put Spread',
        contract: '14NOV25 86.5P / 90P',
        direction: 'SHORT/BEARISH',
        items: ['Buy 90 P @ $0.21', 'Sell 86.5 P @ $0.05'],
        credit: '-$0.16 (Debit)',
        logic: 'TLT 趋势向下，买入 Put Spread 博取短期下跌收益。',
      },
    ],
  },
  '2025-10-27': {
    title: 'GLD 卖权策略',
    trades: [
      {
        symbol: 'GLD',
        strategy: 'Bull Put Spread',
        contract: '28NOV25 360P / 370P',
        direction: 'LONG/BULLISH',
        items: ['Sell 370 P @ $8.81', 'Buy 360 P @ $4.59'],
        credit: '+$4.22',
        logic: '黄金长期看涨，回调即是机会，卖出深虚值 Put Spread。',
      },
    ],
  },
  '2025-10-24': {
    title: 'NFLX 行权止损',
    trades: [
      {
        symbol: 'NFLX',
        strategy: 'Stock Exercise (Loss)',
        contract: 'Stock',
        direction: 'NEUTRAL',
        items: [
          '10/23 Assignment: Buy 200 @ $1170',
          '10/24 Exercise: Sell 200 @ $1160',
        ],
        credit: '-$2000.00 (Loss)',
        logic:
          'NFLX 期权被指派后，股价跌破行权价，选择行权卖出正股止损，承担 $10/股 的价差亏损。',
      },
    ],
  },
  '2025-10-23': {
    title: 'TSLA 平仓与 NFLX 指派',
    trades: [
      {
        symbol: 'TSLA',
        strategy: 'Close Position (Bear Call Spread)',
        contract: '24OCT25 480C / 490C',
        direction: 'NEUTRAL',
        items: ['Buy 480 C @ $0.06', 'Sell 490 C @ $0.04'],
        credit: '-$0.02 (Debit)',
        logic:
          'TSLA 股价回落，Bear Call Spread 利润已大部分兑现，提前平仓释放保证金。',
      },
      {
        symbol: 'NFLX',
        strategy: 'Assignment',
        contract: 'Stock',
        direction: 'NEUTRAL',
        items: ['Assignment 200 Shares @ $1170'],
        credit: 'N/A',
        logic: '卖出的 NFLX Put 被指派，被动买入正股（后续于 10/24 止损）。',
      },
    ],
  },
  '2025-10-22': {
    title: 'NFLX 财报博弈与 TSLA',
    trades: [
      {
        symbol: 'NFLX',
        strategy: 'Bull Put Spread',
        contract: '24OCT25 1160P / 1170P',
        direction: 'LONG/BULLISH',
        items: ['Sell 1170 P @ $33.44', 'Buy 1160 P @ $26.04'],
        credit: '+$7.40',
        logic: '看好 NFLX 财报表现，卖出近端 Put Spread。',
      },
      {
        symbol: 'TSLA',
        strategy: 'Bear Call Spread',
        contract: '24OCT25 480C / 490C',
        direction: 'SHORT/BEARISH',
        items: ['Sell 480 C @ $3.70', 'Buy 490 C @ $2.34'],
        credit: '+$1.36',
        logic: 'TSLA 财报前波动率高，卖出上方 Call Spread 做空波动率。',
      },
    ],
  },
  '2025-10-21': {
    title: 'NFLX 财报前布局',
    trades: [
      {
        symbol: 'NFLX',
        strategy: 'Bull Put Spread',
        contract: '24OCT25 1160P / 1170P',
        direction: 'LONG/BULLISH',
        items: ['Sell 1170 P @ $18.82', 'Buy 1160 P @ $16.06'],
        credit: '+$2.76',
        logic: '分批布局 NFLX 财报行情，卖出 Put Spread。',
      },
    ],
  },
  '2025-10-20': {
    title: 'AAPL 稳健策略',
    trades: [
      {
        symbol: 'AAPL',
        strategy: 'Bull Put Spread',
        contract: '31OCT25 250P / 260P',
        direction: 'LONG/BULLISH',
        items: ['Sell 260 P @ $7.33', 'Buy 250 P @ $3.22'],
        credit: '+$4.11',
        logic: 'AAPL 走势稳健，卖出 Put Spread 收集权利金。',
      },
    ],
  },
  '2025-10-16': {
    title: 'TLT 加仓与 GLD 止盈',
    trades: [
      {
        symbol: 'TLT',
        strategy: 'Bear Put Spread',
        contract: '14NOV25 86.5P / 90P',
        direction: 'SHORT/BEARISH',
        items: ['Buy 90 P @ $0.93', 'Sell 86.5 P @ $0.18'],
        credit: '-$0.75 (Debit)',
        logic: '继续看空美债，加仓 TLT Put Spread。',
      },
      {
        symbol: 'GLD',
        strategy: 'Close Position',
        contract: '17OCT25',
        direction: 'NEUTRAL',
        items: ['Close GLD Spreads'],
        credit: 'N/A',
        logic: 'GLD 达到预期目标，平仓获利。',
      },
    ],
  },
  '2025-10-15': {
    title: 'AVGO & AMD 芯片股策略',
    trades: [
      {
        symbol: 'AVGO',
        strategy: 'Bear Call Spread',
        contract: '25OCT25 370C / 380C',
        direction: 'SHORT/BEARISH',
        items: ['Sell 370 C @ $1.57', 'Buy 380 C @ $0.52'],
        credit: '+$1.05',
        logic: 'AVGO 短期涨幅过大，卖出 Call Spread 看回调。',
      },
      {
        symbol: 'AMD',
        strategy: 'Short Call',
        contract: '17OCT25 150C / 160C',
        direction: 'SHORT/BEARISH',
        items: ['Sell 150 C @ $0.98', 'Sell 160 C @ $0.38'],
        credit: '+$1.36',
        logic: 'AMD 走势疲软，卖出 Call 赚取时间价值。',
      },
    ],
  },
  '2025-10-14': {
    title: 'SPXW 日内交易',
    trades: [
      {
        symbol: 'SPXW',
        strategy: 'Bull Call Spread (Day Trade)',
        contract: '17OCT25 5875C / 5885C',
        direction: 'LONG/BULLISH',
        items: [
          'Open: Buy 5875C / Sell 5885C (Debit $2.40)',
          'Close: Sell 5875C / Buy 5885C (Credit $4.40)',
        ],
        credit: '+$2.00 (Profit)',
        logic: 'SPXW 日内动量交易，捕捉短期上涨趋势，获利 $200/张。',
      },
    ],
  },
  '2025-10-13': {
    title: 'LMT 止盈与 CONL 建仓',
    trades: [
      {
        symbol: 'LMT',
        strategy: 'Sell Stock',
        contract: 'Stock',
        direction: 'NEUTRAL',
        items: ['Sell LMT @ $503'],
        credit: 'N/A',
        logic: '军工股 LMT 冲高回落，卖出正股止盈。',
      },
      {
        symbol: 'CONL',
        strategy: 'Buy Stock',
        contract: 'Stock',
        direction: 'LONG/BULLISH',
        items: ['Buy CONL @ $40.82'],
        credit: 'N/A',
        logic: '看好 Coinbase 及加密货币市场，买入 CONL (2x COIN) 正股。',
      },
    ],
  },
  '2025-10-10': {
    title: 'TLT 布局与 VALE 远期',
    trades: [
      {
        symbol: 'TLT',
        strategy: 'Bear Put Spread',
        contract: '24OCT25 85P / 88.5P',
        direction: 'SHORT/BEARISH',
        items: ['Buy 88.5 P @ $0.23', 'Sell 85 P @ $0.05'],
        credit: '-$0.18 (Debit)',
        logic: '预期利率上升，TLT 将承压，买入 Put Spread。',
      },
      {
        symbol: 'VALE',
        strategy: 'Long Call',
        contract: '31JAN26 10C',
        direction: 'LONG/BULLISH',
        items: ['Buy 10 C @ $0.25'],
        credit: '-$0.25 (Debit)',
        logic: 'VALE 估值低廉，买入远期 LEAPS Call 赌反弹。',
      },
    ],
  },
  '2025-10-09': {
    title: 'GLD 卖权策略',
    trades: [
      {
        symbol: 'GLD',
        strategy: 'Bear Call Spread',
        contract: '17OCT25 385C / 395C',
        direction: 'SHORT/BEARISH',
        items: ['Sell 385 C @ $1.25', 'Buy 395 C @ $0.29'],
        credit: '+$0.96',
        logic: '黄金短期超买，卖出 Call Spread 看回调。',
      },
    ],
  },
  '2025-10-08': {
    title: 'AAPL 布局',
    trades: [
      {
        symbol: 'AAPL',
        strategy: 'Bull Put Spread',
        contract: '31OCT25 250P / 260P',
        direction: 'LONG/BULLISH',
        items: ['Sell 260 P @ $7.85', 'Buy 250 P @ $3.80'],
        credit: '+$4.05',
        logic: 'AAPL 技术面支撑强，卖出 Put Spread。',
      },
    ],
  },
};

const outputDir = path.join(__dirname, '../docs/daily-ops');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

Object.entries(data).forEach(([date, dayData]) => {
  const { title, trades } = dayData;
  let content = `# ${date} ${title}\n\n## 交易概览\n\n`;

  trades.forEach((trade) => {
    const winClass = trade.credit.includes('+') ? 'win' : '';
    const lossClass = trade.direction.includes('SHORT')
      ? 'trade-loss'
      : 'trade-win'; // Just styling logic

    content += `<div class="trade-card ${winClass}">\n\n`;
    content += `**标的:** ${trade.symbol}  \n`;
    content += `**策略:** ${trade.strategy}  \n`;
    content += `**合约:** ${trade.contract}  \n`;
    content += `**方向:** <span class="${lossClass}">${trade.direction}</span>\n\n`;
    content += `**明细:**\n\n`;
    trade.items.forEach((item) => {
      content += `- ${item}\n`;
    });

    // Calculate total credit * 100
    let displayCredit = trade.credit;
    const creditMatch = trade.credit.match(/([+-])\$([\d.]+)(.*)/);
    if (creditMatch) {
      const sign = creditMatch[1];
      const val = parseFloat(creditMatch[2]);
      const suffix = creditMatch[3];
      if (!isNaN(val)) {
        const totalVal = (val * 100).toFixed(0);
        displayCredit = `${sign}$${totalVal}${suffix}`;
      }
    }
    // Special handling for manual loss entry
    if (trade.credit.includes('(Loss)')) {
      displayCredit = trade.credit;
    }

    content += `\n**净权利金 (Credit):** ${displayCredit}\n\n`;
    content += `> **逻辑:** ${trade.logic}\n\n`;
    content += `</div>\n\n`;
  });

  fs.writeFileSync(path.join(outputDir, `${date}.md`), content);
  console.log(`Generated ${date}.md`);
});
