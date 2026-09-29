import React, { useState } from 'react';
import { usePWAInstall } from './usePWAInstall';
import { Download, Smartphone, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-purple-700 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-500 rounded-lg shadow-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        aria-label="Install App as PWA"
        title="Install App as PWA"
      >
        <Download size={13} className="animate-bounce" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-all"
          aria-label="Install App on iOS"
          title="Install App on iOS"
        >
          <Smartphone size={13} />
          <span>Install</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
            <div className="w-full max-w-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                aria-label="Close installation guide"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-700 dark:text-purple-300">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Install on iOS
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Add Abdulfetah's Portfolio to your Home Screen
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-purple-600 dark:text-purple-400">1.</span>
                  <span>Tap the <strong>Share</strong> icon in the Safari toolbar at the bottom of the screen.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-purple-600 dark:text-purple-400">2.</span>
                  <span>Scroll down and select <strong>Add to Home Screen</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-purple-600 dark:text-purple-400">3.</span>
                  <span>Tap <strong>Add</strong> in the top-right corner to launch with standalone performance.</span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-lg bg-purple-700 dark:bg-purple-600 text-white py-2 text-xs font-semibold hover:bg-purple-600 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
