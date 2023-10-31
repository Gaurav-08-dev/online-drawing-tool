import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { GlobalStore } from '@/store'

export default function App({ Component, pageProps }) {
  return (<Provider store={GlobalStore}>
    <Component {...pageProps} />
  </Provider>)
}
