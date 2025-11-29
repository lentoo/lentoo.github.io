const fs = require('fs');
const path = require('path');

const data = {
  '2025-11-26': {
    title: 'TLT 再次布局',
    trades: [
      {
        symbol: 'TLT',
        strategy: 'Bull Put Spread',
        contract: '19DEC25 87P / 90P',
        direction: 'LONG/BULLISH',
        items: ['Sell 3x 90 P @ $1.17', 'Buy 3x 87 P @ $0.25'],
        credit: '+$276',
        logic: 'TLT 回调企稳，卖出 Put Spread 看多，博取反弹收益。',
      },
    ],
  },
  '2025-11-25': {
    title: 'GLD 卖权与 BABA 止盈',
    trades: [
      {
        symbol: 'GLD',
        strategy: 'Bull Put Spread',
        contract: '12DEC25 365P / 375P',
        direction: 'LONG/BULLISH',
        items: ['Sell 375 P @ $4.86', 'Buy 365 P @ $1.93'],
        credit: '+$293',
        logic: '黄金维持强势，卖出高位 Put Spread 赚取权利金。',
      },
      {
        symbol: 'BABA',
        strategy: 'Close Position (Bear Call Spread)',
        contract: '28NOV25 165C / 175C',
        direction: 'NEUTRAL',
        items: ['Buy 165 C @ $0.49', 'Sell 175 C @ $0.09'],
        credit: '-$40 (Debit)',
        logic: 'BABA 策略获利平仓 (开仓于 11/24，Credit $210，获利 $170)。',
      },
    ],
  },
  '2025-11-24': {
    title: 'BABA 做空与 TLT 平仓',
    trades: [
      {
        symbol: 'BABA',
        strategy: 'Bear Call Spread',
        contract: '28NOV25 165C / 175C',
        direction: 'SHORT/BEARISH',
        items: ['Sell 165 C @ $3.27', 'Buy 175 C @ $1.17'],
        credit: '+$210',
        logic: '看空 BABA 短期走势，卖出 Call Spread。',
      },
      {
        symbol: 'TLT',
        strategy: 'Close Position',
        contract: '05DEC25 85P / 88P',
        direction: 'NEUTRAL',
        items: ['Buy 3x 88 P @ $0.11', 'Sell 3x 85 P @ $0.02'],
        credit: '-$27 (Debit)',
        logic: '平仓 TLT 之前的 Put Spread 头寸，释放保证金。',
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
      : 'trade-win';

    content += `<div class="trade-card ${winClass}">\n\n`;
    content += `**标的:** ${trade.symbol}  \n`;
    content += `**策略:** ${trade.strategy}  \n`;
    content += `**合约:** ${trade.contract}  \n`;
    content += `**方向:** <span class="${lossClass}">${trade.direction}</span>\n\n`;
    content += `**明细:**\n\n`;
    trade.items.forEach((item) => {
      content += `- ${item}\n`;
    });

    content += `\n**净权利金 (Credit):** ${trade.credit}\n\n`;
    content += `> **逻辑:** ${trade.logic}\n\n`;
    content += `</div>\n\n`;
  });

  fs.writeFileSync(path.join(outputDir, `${date}.md`), content);
  console.log(`Generated ${date}.md`);
});
