import { useState, useEffect, useRef } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './common.scss';

const MoreOptions = ({ children, ...props }) => {
  const [showFilters, setShowFilters] = useState(false);
  const wrapperRef = useRef(null);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  // 🔐 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

  return (
    <div ref={wrapperRef} className="more-options">
      <button
        type="button"
        onClick={toggleFilters}
        aria-haspopup="menu"
        aria-expanded={showFilters}
        className="more-options__button"
        {...props}
      >
        <MoreVertIcon />
      </button>

      {showFilters && (
        <div className="more-options__dropdown">
          {children || <p className="more-options__empty">No options provided.</p>}
        </div>
      )}
    </div>
  );
};

export default MoreOptions;
