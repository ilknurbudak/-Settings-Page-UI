// @ts-nocheck
import React from 'react';

interface SettingsCardProps {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  isDarkMode: boolean;
  index?: number;
  isLast?: boolean;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ 
  title, 
  icon, 
  isActive, 
  onClick, 
  isDarkMode,
  index = 0,
  isLast = false
}) => {
  // Serial Position Effect - İlk ve son öğeleri vurgula
  const isFirstOrLast = index === 0 || isLast;
  
  return (
    <div 
      className={`
        relative w-full p-5 cursor-pointer transition-all duration-300 overflow-hidden
        ${isActive 
          ? isDarkMode 
            ? 'shadow-none text-white' 
            : 'shadow-none text-gray-900' 
          : isDarkMode 
            ? 'shadow-none hover:bg-[#566783]/30' 
            : 'shadow-none hover:bg-[#f9725a]/10'
        }
        ${isActive 
          ? isDarkMode 
            ? 'bg-[#566783]/30' 
            : 'bg-[#f9725a]/10' 
          : isDarkMode 
            ? 'bg-transparent text-[#cebebd]' 
            : 'bg-transparent text-[#20264a]'
        }
        ${isFirstOrLast && !isActive 
          ? isDarkMode 
            ? 'bg-[#566783]/10 border-l-2 border-l-[#f9725a]' 
            : 'bg-[#f9725a]/5 border-l-2 border-l-[#f9725a]'
          : ''
        }
        rounded-xl transform hover:scale-[1.01] transition-all duration-300
        h-[4.5rem] my-1
      `}
      onClick={onClick}
    >
      {/* Fitts's Law: Large click target that covers the entire card */}
      <div className="absolute inset-0 w-full h-full z-10" onClick={onClick}></div>
      
      {/* Status indicator */}
      <div className={`absolute top-0 right-0 mt-2 mr-2 ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 z-20`}>
        <div className={`h-2 w-2 rounded-full ${isDarkMode ? 'bg-[#f9725a]' : 'bg-[#f9725a]'} animate-pulse`}></div>
      </div>
      
      {/* Content container with 3D effect */}
      <div className="flex items-center space-x-5 relative z-[5] h-full">
        {/* Icon with floating effect - Fitts's Law: larger touch target */}
        <div className={`
          transition-all duration-300 text-[1.75rem] transform p-1
          ${isActive 
            ? 'scale-105' 
            : 'scale-100 hover:scale-105'
          }
          ${isActive 
            ? isDarkMode 
              ? 'text-[#f9725a]' 
              : 'text-[#f9725a]' 
            : isDarkMode 
              ? 'text-[#cebebd]' 
              : 'text-[#20264a]'
          }
          ${isFirstOrLast && !isActive ? 'text-[#f9725a]' : ''}
        `}>
          {icon}
        </div>

        {/* Title with gradient effect */}
        <span className={`
          font-semibold text-[1.1rem] flex-1 transition-all duration-300
          ${isActive 
            ? isDarkMode 
              ? 'text-[#f9725a]' 
              : 'text-[#f9725a]'
            : isDarkMode 
              ? 'text-[#cebebd]' 
              : 'text-[#20264a]'
          }
          ${isFirstOrLast && !isActive ? 'text-[#f9725a]/80' : ''}
        `}>
          {title}
        </span>
        
        {/* Fitts's Law: Visual feedback for clickable area - subtle arrow */}
        <div className={`
          mr-2 transition-all duration-300 transform
          ${isActive ? 'opacity-100 translate-x-0' : 'opacity-50 -translate-x-2'}
        `}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isActive ? (isDarkMode ? 'text-[#f9725a]' : 'text-[#f9725a]') : 'text-[#566783]'}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Animated bottom indicator */}
      <div className={`
        absolute bottom-0 left-0 h-0.5 transform transition-all duration-500 ease-out
        ${isActive 
          ? 'w-full' 
          : 'w-0'
        }
        ${isDarkMode 
          ? 'bg-[#f9725a]' 
          : 'bg-[#f9725a]'
        }
        rounded-full
      `}></div>
    </div>
  );
};

export default SettingsCard; 