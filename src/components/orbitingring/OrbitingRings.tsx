import React from 'react';
import { Eye, Check, Scan } from 'lucide-react';

const OrbitingRings = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative w-full max-w-lg aspect-square">
        {/* Outer ring */}
        <div 
          className="absolute inset-0 border-2 border-gray-100 rounded-full animate-spin" 
          style={{ animationDuration: '20s' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-violet-500 rounded-full" />
        </div>
        
        {/* Middle ring */}
        <div 
          className="absolute inset-8 border border-gray-200 rounded-full animate-spin" 
          style={{ animationDuration: '15s', animationDirection: 'reverse' }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-black rounded-full" />
        </div>

        {/* Inner ring */}
        <div 
          className="absolute inset-16 border border-gray-300 rounded-full animate-spin" 
          style={{ animationDuration: '10s' }}
        >
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full" />
        </div>

        {/* Center content */}
        <div className="absolute inset-24 bg-gradient-to-br from-black via-gray-900 to-black rounded-full flex items-center justify-center shadow-2xl">
          <div className="text-center">
            <Eye className="w-16 h-16 text-white mx-auto mb-2" />
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/60 text-sm font-medium">ACTIVO</span>
            </div>
          </div>
        </div>

        {/* Floating card - Right */}
        <div 
          className="absolute -right-4 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-bounce" 
          style={{ animationDuration: '3s' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-sm">María López</div>
              <div className="text-xs text-gray-400">Entrada 08:57</div>
            </div>
          </div>
        </div>

        {/* Floating card - Left */}
        <div 
          className="absolute -left-4 bottom-1/4 bg-black text-white p-4 rounded-2xl shadow-xl animate-bounce" 
          style={{ animationDuration: '4s', animationDelay: '1s' }}
        >
          <div className="flex items-center gap-3">
            <Scan className="w-8 h-8 text-violet-400" />
            <div>
              <div className="font-semibold text-sm">Escaneando...</div>
              <div className="text-xs text-gray-400">ID verificado</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitingRings;