"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className = "" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let top = triggerRect.bottom + 8;
      let left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
      
      // Adjust horizontal position if tooltip would overflow
      if (left < 8) {
        left = 8;
      } else if (left + tooltipRect.width > viewportWidth - 8) {
        left = viewportWidth - tooltipRect.width - 8;
      }
      
      // Adjust vertical position if tooltip would overflow
      if (top + tooltipRect.height > viewportHeight - 8) {
        top = triggerRect.top - tooltipRect.height - 8;
      }
      
      setPosition({ top, left });
    }
  };

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      
      const handleResize = () => updatePosition();
      const handleScroll = () => updatePosition();
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          tooltipRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          !tooltipRef.current.contains(event.target as Node)
        ) {
          hideTooltip();
        }
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside as EventListener);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside as EventListener);
      };
    }
  }, [isVisible]);

  // Portal the tooltip to document.body to avoid z-index issues
  const tooltipPortal = isVisible && typeof window !== 'undefined' ? createPortal(
    <div
      ref={tooltipRef}
      className={`fixed z-50 max-w-xs p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none ${className}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="relative">
        {content}
        {/* Arrow pointing up */}
        <div 
          className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"
          style={{
            left: `${Math.min(Math.max(16, (triggerRef.current?.getBoundingClientRect().left || 0) + (triggerRef.current?.getBoundingClientRect().width || 0) / 2 - position.left), (tooltipRef.current?.getBoundingClientRect().width || 0) - 16)}px`
          }}
        />
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-block cursor-help"
        onClick={showTooltip}
        onMouseEnter={showTooltip}
        onMouseLeave={() => {
          // On desktop, hide on mouse leave unless it's a touch device
          if (!('ontouchstart' in window)) {
            hideTooltip();
          }
        }}
      >
        {children}
      </div>
      {tooltipPortal}
    </>
  );
}
