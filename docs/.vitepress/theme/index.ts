import DefaultTheme from 'vitepress/theme';
import './custom.css';
import MonthlyPnL from '../../components/MonthlyPnL.vue';
import MonthlyPnLNov from '../../components/MonthlyPnLNov.vue';
import MonthlyPnLSep from '../../components/MonthlyPnLSep.vue';
import MonthlyPnLAug from '../../components/MonthlyPnLAug.vue';
import MonthlyPnLJul from '../../components/MonthlyPnLJul.vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    app.component('MonthlyPnL', MonthlyPnL);
    app.component('MonthlyPnLNov', MonthlyPnLNov);
    app.component('MonthlyPnLSep', MonthlyPnLSep);
    app.component('MonthlyPnLAug', MonthlyPnLAug);
    app.component('MonthlyPnLJul', MonthlyPnLJul);
  },
};
