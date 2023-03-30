import type { AppProps } from 'next/app';
import GluestackProvider from '@project/components';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GluestackProvider>
      <Component {...pageProps} />
    </GluestackProvider>
  );
}
