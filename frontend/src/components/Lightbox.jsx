import React, { useEffect, useCallback } from 'react';

export default function Lightbox({ 
  isOpen, 
  onClose, 
  imgUrl, 
  desc,
  onPrev,
  onNext,
  hasPrev,
  hasNext 
}) {
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        if (hasPrev) onPrev();
        break;
      case 'ArrowRight':
        if (hasNext) onNext();
        break;
      default:
        break;
    }
  }, [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>×</button>
        <div className="lightbox-image-container">
          {hasPrev && (
            <button className="lightbox-nav prev" onClick={onPrev}>
              ‹
            </button>
          )}
          <img src={imgUrl} alt={desc} />
          {hasNext && (
            <button className="lightbox-nav next" onClick={onNext}>
              ›
            </button>
          )}
        </div>
        {desc && <div className="lightbox-desc">{desc}</div>}
      </div>
    </div>
  );
}