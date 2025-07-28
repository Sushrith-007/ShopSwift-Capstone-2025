import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ SW registered: ', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, notify user
              if (window.confirm('New version available! Reload to update?')) {
                window.location.reload();
              }
            }
          });
        });
      })
      .catch((registrationError) => {
        console.log('❌ SW registration failed: ', registrationError);
      });
  });
}

// PWA Install Prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('💡 PWA install prompt available');
  e.preventDefault();
  deferredPrompt = e;
  
  // Show custom install button/banner
  const installBanner = document.createElement('div');
  installBanner.innerHTML = `
    <div style="
      position: fixed; 
      bottom: 20px; 
      left: 20px; 
      right: 20px; 
      background: #2563eb; 
      color: white; 
      padding: 15px; 
      border-radius: 8px; 
      display: flex; 
      justify-content: space-between; 
      align-items: center;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    ">
      <div>
        <strong>Install ShopSwift</strong><br>
        <small>Get the full app experience!</small>
      </div>
      <div>
        <button id="install-btn" style="
          background: white; 
          color: #2563eb; 
          border: none; 
          padding: 8px 16px; 
          border-radius: 4px; 
          margin-right: 10px;
          cursor: pointer;
          font-weight: bold;
        ">Install</button>
        <button id="dismiss-btn" style="
          background: transparent; 
          color: white; 
          border: 1px solid white; 
          padding: 8px 16px; 
          border-radius: 4px;
          cursor: pointer;
        ">Not now</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(installBanner);
  
  // Handle install button click
  document.getElementById('install-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`PWA install ${outcome}`);
      deferredPrompt = null;
      installBanner.remove();
    }
  });
  
  // Handle dismiss button click
  document.getElementById('dismiss-btn').addEventListener('click', () => {
    installBanner.remove();
    deferredPrompt = null;
  });
});

// Handle successful PWA installation
window.addEventListener('appinstalled', (evt) => {
  console.log('✅ PWA was installed successfully');
  // Track installation analytics here
});

reportWebVitals();
