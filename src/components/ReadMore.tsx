import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ReadMoreText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const style = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: isExpanded ? 'none' : '2', // Show all lines when expanded
    WebkitBoxOrient: 'vertical',
    cursor: 'pointer'
  };

  return (
    <motion.div
      className="text-center text-sm font-bold"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={style}
      onClick={toggleExpanded}
    >
      {text || "No description provided."}
    </motion.div>
  );
};

export default ReadMoreText;
