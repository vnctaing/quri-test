import React from 'react';
import PollItem from './PollItem.js';

const Poll = (props) => {
  return (
    <div className="poll">
      {props.items.map((item, index) => <PollItem item={item} />)}
      {props.children}
    </div>
  )
}

export default Poll;