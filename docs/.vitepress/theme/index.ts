import DefaultTheme from 'vitepress/theme';
import './custom.css';
import MonthlyPnL from '../../components/MonthlyPnL.vue';
import MonthlyPnLNov from '../../components/MonthlyPnLNov.vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    app.component('MonthlyPnL', MonthlyPnL);
    app.component('MonthlyPnLNov', MonthlyPnLNov);
  },
};
