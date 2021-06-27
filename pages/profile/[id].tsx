import React from 'react';
import { Header } from '../../components/Header';
import { Profile } from '../../components/Profile';

export default function ProfilePage(props) {
  return (
    <>
      <Header />
      <div className="container mt-40">
        <Profile
          fullname={'Kuzma Mudze'}
          username={'kzmmdz'}
          about={'fsasfasfa'}
          avatarUrl={null}
        />
      </div>
    </>
  );
}
