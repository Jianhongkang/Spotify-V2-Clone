import '../styles/globals.css';
import {SessionProvider} from "next-auth/react";
import {RecoilRoot} from 'recoil';



function MyApp({ Component: NextComponent, pageProps: { session, ...pageProps } }: {
  Component: React.ComponentType<any>;
  pageProps: any;
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
      <NextComponent {...pageProps} />
    </RecoilRoot>
  
    </SessionProvider>
  );
}

export default MyApp
