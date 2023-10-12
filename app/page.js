"use client"
import BarcodeScanner from '@/components/BarcodeScanner'
import Image from 'next/image'
import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const toggleScanner = () => {
    setIsScanning(!isScanning);
  };
  return (
    <main className="flex min-h-screen text-black bg-white flex-col items-center justify-between p-24">
     <h1 >Barcode Scanner</h1>
     <button onClick={toggleScanner}>
        {isScanning ? 'Stop Scanning' : 'Start Scanning'}
      </button>
      {isScanning && (<BarcodeScanner onDetected={(code) => setCode(code)} isScanning={isScanning} />)}
      <p>Scanned Code: {code}</p>
    </main>
  )
}
