import React from 'react';
import PollItem from './PollItem.js';

const Poll = (props) => {
  function removeItem() {
    props.onRemove(this);
  }

  return (
    <div className="poll">
      {props.items.map((item, index) => <PollItem key={index} item={item} deletePollItem={removeItem.bind(item)} />)}
      {props.children}
    </div>
  );
};

export default Poll;
