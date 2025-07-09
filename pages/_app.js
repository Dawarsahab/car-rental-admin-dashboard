import Layout from '@/components/Layout';
import { AuthProvider } from '@/context/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationProvider>
    </AuthProvider>
  );
}