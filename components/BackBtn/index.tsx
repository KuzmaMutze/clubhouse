import React from 'react';

type PropsType = {};
export const BackBtn: React.FC<PropsType> = (props) => {
  return (
    <div className="d-flex">
      <img src="/static/back-arrow.svg"></img>
      <h3 className="ml-10">Back</h3>
    </div>
  );
};
