import React, { useState, useEffect } from 'react';

interface SelectiveAttentionNotificationProps {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  isImportant?: boolean;
  isDarkMode: boolean;
  onDismiss?: () => void;
  autoHideDuration?: number;
}

const SelectiveAttentionNotification: React.FC<SelectiveAttentionNotificationProps> = ({
  type,
  message,
  isImportant = false,
  isDarkMode,
  onDismiss,
  autoHideDuration = 5000
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasAttention, setHasAttention] = useState(false);
  const [opacity, setOpacity] = useState(1);
  
  // Auto-hide notification after specified duration
  useEffect(() => {
    let hideTimer: NodeJS.Timeout;
    
    if (autoHideDuration && !isImportant) {
      hideTimer = setTimeout(() => {
        hide();
      }, autoHideDuration);
    }
    
    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [autoHideDuration, isImportant]);
  
  // Effect to make less important notifications fade slightly over time
  useEffect(() => {
    let opacityTimer: NodeJS.Timeout;
    
    if (!isImportant && !hasAttention) {
      opacityTimer = setTimeout(() => {
        setOpacity(0.85);
      }, 2000);
    } else {
      setOpacity(1);
    }
    
    return () => {
      if (opacityTimer) clearTimeout(opacityTimer);
    };
  }, [isImportant, hasAttention]);
  
  const hide = () => {
    setIsVisible(false);
    if (onDismiss) {
      setTimeout(() => {
        onDismiss();
      }, 300); // Allow animation to complete
    }
  };
  
  const getBackgroundColor = () => {
    if (isDarkMode) {
      switch (type) {
        case 'success': return 'bg-[#20264a] border-l-4 border-l-[#f9725a]';
        case 'warning': return 'bg-[#20264a] border-l-4 border-l-amber-500';
        case 'error': return 'bg-[#20264a] border-l-4 border-l-red-500';
        case 'info': return 'bg-[#20264a] border-l-4 border-l-[#566783]';
        default: return 'bg-[#20264a]';
      }
    } else {
      switch (type) {
        case 'success': return 'bg-white border-l-4 border-l-[#f9725a]';
        case 'warning': return 'bg-white border-l-4 border-l-amber-500';
        case 'error': return 'bg-white border-l-4 border-l-red-500';
        case 'info': return 'bg-white border-l-4 border-l-[#566783]';
        default: return 'bg-white';
      }
    }
  };
  
  const getTextColor = () => {
    if (isDarkMode) {
      switch (type) {
        case 'success': return 'text-[#f9725a]';
        case 'warning': return 'text-amber-400';
        case 'error': return 'text-red-400';
        case 'info': return 'text-[#cebebd]';
        default: return 'text-[#cebebd]';
      }
    } else {
      switch (type) {
        case 'success': return 'text-[#f9725a]';
        case 'warning': return 'text-amber-600';
        case 'error': return 'text-red-600';
        case 'info': return 'text-[#20264a]';
        default: return 'text-[#20264a]';
      }
    }
  };
  
  const getIconByType = () => {
    switch (type) {
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'warning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`
        fixed top-6 right-6 z-50 max-w-sm w-full
        shadow-lg rounded-lg transition-all duration-300
        ${getBackgroundColor()}
        ${isImportant ? 'animate-pulse' : ''}
        transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
        selective-attention-notification
      `}
      style={{ opacity }}
      onMouseEnter={() => setHasAttention(true)}
      onMouseLeave={() => setHasAttention(false)}
    >
      <div className="p-4 flex items-start">
        <div className={`flex-shrink-0 mr-3 ${getTextColor()}`}>
          {getIconByType()}
        </div>
        <div className="w-full">
          <p className={`text-sm ${isDarkMode ? 'text-[#cebebd]' : 'text-[#20264a]'}`}>{message}</p>
        </div>
        <button 
          onClick={hide}
          className={`
            ml-4 flex-shrink-0 text-sm focus:outline-none
            ${isDarkMode ? 'text-[#566783] hover:text-[#cebebd]' : 'text-gray-400 hover:text-gray-600'}
          `}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Progress indicator for auto-dismissing notifications */}
      {!isImportant && autoHideDuration > 0 && (
        <div className="h-1 w-full bg-gray-200 rounded-b-lg overflow-hidden">
          <div 
            className={`h-full ${getTextColor().replace('text-', 'bg-')} notification-progress`}
            style={{ 
              width: '100%', 
              animationDuration: `${autoHideDuration / 1000}s` 
            }}
          />
        </div>
      )}
      
      {/* Add CSS via style element instead of jsx */}
      <style>
        {`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
          .notification-progress {
            animation: shrink linear forwards;
          }
        `}
      </style>
    </div>
  );
};

export default SelectiveAttentionNotification; 