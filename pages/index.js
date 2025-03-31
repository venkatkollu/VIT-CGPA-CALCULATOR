import Head from 'next/head';
import VITCGPACalculator from '../components/VITCGPACalculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Head>
        <title>VIT CGPA Calculator</title>
        <meta name="description" content="Calculate your VIT CGPA easily" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <VITCGPACalculator />
      </main>
    </div>
  );
}
