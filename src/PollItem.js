import React from 'react';

const PollItem = (props) => {
  return (
    <button className="pollItem">
      <span>{props.item}   </span><strong>X</strong>
    </button>
  )
};

export default PollItem;