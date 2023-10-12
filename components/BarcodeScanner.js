// components/BarcodeScanner.js

import { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected, isScanning }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    if (isScanning) {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerRef.current,
            constraints: {
              facingMode: "environment"
            }
          },
          decoder: {
            readers: ["ean_reader"]
          }
        },
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((data) => {
        if (data.codeResult) {
          onDetected(data.codeResult.code);
        }
      });
    } else {
      Quagga.stop();
    }

    return () => Quagga.stop();
  }, [isScanning, onDetected]);

  return <div ref={scannerRef} style={{ width: '100%', height: '300px' }} />;
};

export default BarcodeScanner;
