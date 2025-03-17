import React, { useState, useEffect } from 'react';

interface SelectiveAttentionProps {
  isDarkMode: boolean;
  children?: React.ReactNode;
  isImportant?: boolean;
  title: string;
  description: string;
}

const SelectiveAttention: React.FC<SelectiveAttentionProps> = ({
  isDarkMode,
  children,
  isImportant = false,
  title,
  description
}) => {
  // State to track if element has been interacted with
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Reset interaction state after a period to maintain attention capabilities
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (hasInteracted) {
      timeoutId = setTimeout(() => {
        setHasInteracted(false);
      }, 10000); // Reset after 10 seconds
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasInteracted]);
  
  // Handle interaction to track when user engages with this component
  const handleInteraction = () => {
    setHasInteracted(true);
  };
  
  return (
    <div 
      className={`
        selective-attention-container relative
        rounded-xl p-[1.618rem] transition-all duration-300
        ${isDarkMode 
          ? 'bg-[#20264a] border border-[#566783]' 
          : 'bg-white border border-gray-200'
        }
        ${isImportant && !hasInteracted 
          ? 'animate-pulse shadow-lg border-[#f9725a]' 
          : ''
        }
        ${hasInteracted 
          ? 'border-[#f9725a] shadow-md' 
          : ''
        }
      `}
      onClick={handleInteraction}
      onMouseEnter={handleInteraction}
    >
      {/* Visual cue for important or interacted elements */}
      {(isImportant || hasInteracted) && (
        <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#f9725a] m-2"></div>
      )}
      
      {/* Blur effect for non-focused items when important items exist */}
      {isImportant && !hasInteracted && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f9725a]/10 rounded-xl"></div>
      )}
      
      <div className="relative z-10">
        <h4 className={`
          text-lg font-semibold mb-2
          ${isImportant || hasInteracted 
            ? 'text-[#f9725a]' 
            : isDarkMode 
              ? 'text-[#cebebd]' 
              : 'text-[#20264a]'
          }
        `}>
          {title}
        </h4>
        
        <p className={`
          text-sm mb-3
          ${isDarkMode ? 'text-[#cebebd]' : 'text-[#20264a]'}
          ${!isImportant && !hasInteracted ? 'opacity-80' : 'opacity-100'}
        `}>
          {description}
        </p>
        
        {/* Render children with enhanced focus if important or interacted */}
        <div className={`
          transition-all duration-300
          ${(isImportant || hasInteracted) ? 'transform scale-[1.02]' : ''}
        `}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SelectiveAttention; 