import App from './src'
import Sentry from 'sentry-expo';
// import { SentrySeverity, SentryLog } from 'react-native-sentry';
Sentry.config('https://ac4d30114ac94746a61782e683fd63bc@sentry.io/306744').install();

export default App
