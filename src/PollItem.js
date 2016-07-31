import React from 'react';

const PollItem = (props) => {
  return (
    <button className="pollItem" onClick={props.deletePollItem}>
      <span>{props.item}   </span><strong>X</strong>
    </button>
  )
};

export default PollItem;