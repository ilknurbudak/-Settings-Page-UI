// @ts-nocheck
import React from 'react';

// Toggle Container Component with Selective Attention principles
interface ToggleContainerProps {
  title: string; 
  description: string; 
  isOn: boolean; 
  handleToggle: () => void; 
  isDarkMode: boolean;
  isImportant?: boolean;
}

const ToggleContainer: React.FC<ToggleContainerProps> = ({ 
  title, 
  description, 
  isOn, 
  handleToggle, 
  isDarkMode,
  isImportant = false
}) => {
  // Selective Attention - make important toggles stand out
  const attentionBorderClass = isImportant ? 'border-l-4 border-l-[#f9725a]' : '';
  
  return (
    <div className={`
      toggle-container
      ${isDarkMode 
        ? 'bg-[#566783] border border-[#20264a]' 
        : 'bg-white border border-gray-200'
      } 
      rounded-xl p-[1.618rem] relative overflow-hidden transition-all duration-300
      ${isOn 
        ? isDarkMode 
          ? 'shadow-[inset_0_0_0_1px_rgba(249,114,90,0.5)]'
          : 'shadow-[inset_0_0_0_1px_rgba(249,114,90,0.5)]' 
        : ''
      }
      ${attentionBorderClass}
    `}>
      {/* Animated background glow - decorative element */}
      <div className={`
        decoration
        absolute inset-0 opacity-10 transition-opacity duration-500
        ${isOn ? 'opacity-20' : 'opacity-0'}
      `}>
        <div className={`
          absolute h-32 w-32 rounded-full filter blur-xl
          ${isDarkMode 
            ? 'bg-[#f9725a]'
            : 'bg-[#f9725a]'
          }
          -top-10 -right-10 transform scale-150
        `}></div>
      </div>
      
      <div className="flex justify-between items-start z-10 relative">
        <div>
          <h5 className={`
            font-semibold text-lg mb-1
            ${isOn 
              ? isDarkMode 
                ? 'text-[#f9725a]'
                : 'text-[#f9725a]' 
              : isDarkMode 
                ? 'text-[#cebebd]'
                : 'text-[#20264a]'
            }
            ${isImportant ? 'flex items-center' : ''}
          `}>
            {isImportant && (
              <span className="w-2 h-2 bg-[#f9725a] rounded-full mr-2 animate-pulse"></span>
            )}
            {title}
          </h5>
          <p className={`
            ${isDarkMode ? 'text-[#cebebd]' : 'text-[#566783]'} text-sm
          `}>
            {description}
          </p>
        </div>
        <div 
          className={`
            w-16 h-8 flex items-center rounded-full p-1 cursor-pointer 
            transition-all duration-500 ease-in-out
            ${isOn 
              ? isDarkMode 
                ? 'bg-gradient-to-r from-[#f9725a] to-[#f97e6a] shadow-[0_0_15px_rgba(249,114,90,0.5)]' 
                : 'bg-gradient-to-r from-[#f9725a] to-[#f97e6a] shadow-[0_0_15px_rgba(249,114,90,0.3)]' 
              : isDarkMode 
                ? 'bg-[#566783]' 
                : 'bg-gray-300'
            }
          `}
          onClick={handleToggle}
        >
          <div 
            className={`
              ${isDarkMode ? 'bg-[#20264a]' : 'bg-white'} w-6 h-6 rounded-full shadow-md
              transform transition-all duration-500 ease-in-out
              ${isOn ? 'translate-x-8' : 'translate-x-0'}
              ${isOn ? 'scale-110' : 'scale-100'}
              ${isOn && 'ring-2 ring-opacity-40 ' + (isDarkMode ? 'ring-[#cebebd]' : 'ring-[#f9725a]')}
            `}
          >
            {/* Inner dot for toggle state */}
            <div className={`
              absolute inset-0 m-auto w-2 h-2 rounded-full transform transition-all duration-300
              ${isOn 
                ? isDarkMode 
                  ? 'bg-[#f9725a] scale-100' 
                  : 'bg-[#f9725a] scale-100' 
                : 'scale-0'
              }
            `}></div>
          </div>
        </div>
      </div>
      
      {/* Attention-grabbing element for important toggles */}
      {isImportant && (
        <div className="absolute -right-10 -bottom-10 w-20 h-20 bg-[#f9725a]/10 rounded-full"></div>
      )}
    </div>
  );
};

export default ToggleContainer; 