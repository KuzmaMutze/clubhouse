import { Header } from '../components/Header';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { Button } from '../components/Button/Button';
import { ConversationCard } from '../components/ConversationCard';
import Axios from '../api/api';
import { useRouter } from 'next/router';
// import JsCookies from 'js-cookie';
import { checkAuth } from '../helpers/checkAuth';

const RoomsPage: NextPage = ({ rooms }: any) => {
  const router = useRouter();
  const roomId = router.query.id;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Clubhouse: Drop-in audio chat</title>
      </Head>
      <Header />
      <div className="container">
        <div className=" mt-40 d-flex align-items-center justify-content-between">
          <h1>All conversations</h1>
          <Button color="green">+ Start room</Button>
        </div>

        <div className="grid mt-30">
          {rooms.map((room, i) => (
            <Link key={i} href={`/rooms/${room.id}`}>
              <a>
                <ConversationCard
                  title={room.title}
                  speakers={room.avatars}
                  listenersCount={room.guests}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const user = await checkAuth(context);
    console.log(user, 'USER DATA !!!!');

    if (!user) {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }
  } catch (error) {
    console.log('Error with rooms checkAuth!');
  }
  return {
    props: {
      rooms: [],
    },
  };
};

export default RoomsPage;
