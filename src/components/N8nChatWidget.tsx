import React, { useEffect } from 'react';

declare global {
  interface Window {
    createChat?: (config: {
      webhookUrl: string;
      i18n?: {
        en?: {
          title?: string;
          subtitle?: string;
          placeholder?: string;
          getStarted?: string;
        }
      };
    }) => void;
    Chatbot?: {
      open: () => void;
      close: () => void;
      toggle: () => void;
    };
    openMorningBiteChat?: () => void;
  }
}

export const N8nChatWidget: React.FC = () => {
  useEffect(() => {
    // Expose dynamic launch function
    window.openMorningBiteChat = () => {
      if (window.Chatbot) {
        window.Chatbot.open();
      } else {
        const btn = document.querySelector('.n8n-chat-button') as HTMLElement;
        if (btn) btn.click();
      }
    };
    // 1. Append n8n Chat CSS to Head
    const cssId = 'n8n-chat-css';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat@0/dist/style.css';
      document.head.appendChild(link);
    }

    // 2. Append n8n Chat JavaScript Bundle to Body
    const scriptId = 'n8n-chat-js';
    const script = document.createElement('script');
    
    const initChat = () => {
      if (window.createChat) {
        window.createChat({
          webhookUrl: 'https://healthybreakfast.app.n8n.cloud/webhook/49d2d847-4393-4f9a-919b-34155aba2193/chat',
          i18n: {
            en: {
              title: 'MorningBite Wellness AI',
              subtitle: 'Ask me about breakfast plans, recipes & nutrition!',
              placeholder: 'Type your message here...',
              getStarted: 'Start healthy conversation'
            }
          }
        });
      }
    };

    if (!document.getElementById(scriptId)) {
      script.id = scriptId;
      script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat@0/dist/chat.bundle.js';
      script.async = true;
      script.onload = () => {
        initChat();
      };
      document.body.appendChild(script);
    } else {
      // If script is already in document, just try to initialize
      initChat();
    }

    return () => {
      // Clean up of actual chat widget DOM container isn't strictly necessary 
      // as it persists across navigation, but we keep the script reference
    };
  }, []);

  return null; // The n8n widget appends its own launcher bubble directly to body
};
