import React from 'react';
import { BackBtn } from '../../components/BackBtn';
import { Header } from '../../components/Header';
import { Room } from '../../components/Room';

type PropsType = {};
const rooms: React.FC<PropsType> = (props) => {
  return (
    <>
      <Header />
      <div className="container">
        <BackBtn />
        <h1>All conversations</h1>
        <Room title="test create room" />
      </div>
    </>
  );
};

export default rooms;
