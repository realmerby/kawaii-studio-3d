'use client';

import React, { Suspense, Component, ReactNode, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { StudioScene } from './StudioScene';
import { LoadingScreen } from './LoadingScreen';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('WebGL Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-pink-50 select-none">
          <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 shadow-sm">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-gray-800 mb-1">
            3D Sahne Yüklenirken Bir Sorun Oluştu
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mb-4 leading-relaxed">
            Tarayıcınızın WebGL donanım hızlandırmasını desteklediğinden emin olun veya sayfayı yenileyin.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl text-xs font-bold shadow-md shadow-pink-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sayfayı Yenile</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function GameCanvas() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      setIsSupported(!!gl);
    } catch {
      setIsSupported(false);
    }
  }, []);

  if (isSupported === false) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-pink-50">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className="text-sm font-bold text-gray-800 mb-1">
          WebGL Tarayıcınızda Desteklenmiyor
        </h3>
        <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
          Kawaii Studio 3D&apos;yi çalıştırmak için lütfen modern bir tarayıcı (Chrome, Safari, Edge, Firefox) kullanın.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full select-none overflow-hidden touch-none">
      <WebGLErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <Canvas
            shadows
            camera={{ position: [0, 0.25, 3.4], fov: 42 }}
            gl={{
              preserveDrawingBuffer: true,
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            dpr={[1, 2]} // High-DPI crisp rendering
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <StudioScene />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  );
}
