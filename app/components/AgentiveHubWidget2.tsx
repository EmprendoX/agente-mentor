"use client";

import { useEffect } from 'react';

export default function AgentiveHubWidget2() {
  useEffect(() => {
    console.log('AgentiveHubWidget2: Component loaded for como-hacer-que-extranos-compren-tu-propiedad');
    
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="agentivehub.com/production.bundle.min.js"]');
    
    if (!existingScript) {
      // Load AgentiveHub script only if not already loaded
      const script = document.createElement('script');
      script.src = "https://agentivehub.com/production.bundle.min.js";
      script.type = "text/javascript";
      
      script.onload = function() {
        if ((window as any).myChatWidget && typeof (window as any).myChatWidget.load === 'function') {
          (window as any).myChatWidget.load({
            id: '5f3849a3-45c5-4cd7-9e1f-3b6716b30d6f',
          });
        }
      };
      
      document.head.appendChild(script);
    } else {
      // Script already exists, just load the widget
      if ((window as any).myChatWidget && typeof (window as any).myChatWidget.load === 'function') {
        (window as any).myChatWidget.load({
          id: '5f3849a3-45c5-4cd7-9e1f-3b6716b30d6f',
        });
      }
    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Chat con IA - AgentiveHub
        </h3>
        <div id="agentivehub-root2" className="flex justify-center">
          {/* AgentiveHub widget will be loaded here */}
        </div>
      </div>
    </div>
  );
} 