import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button/Button';
import { BackBtn } from '../BackBtn';
import classes from './Profile.module.scss';

type PropsType = {
  fullname: string;
  username: string;
  avatarUrl: string;
  about: string;
};
export const Profile: React.FC<PropsType> = ({ username, fullname, about, avatarUrl }) => {
  return (
    <>
      <Link href="/rooms">
        <BackBtn />
      </Link>

      <div className="d-flex mt-30">
        <div className="d-flex align-items-center ">
          <Avatar
            className="ml-10"
            src={`${
              avatarUrl ||
              'https://sun9-46.userapi.com/impf/c849128/v849128091/19d9d5/LGFbqmfRYKg.jpg?size=1606x1586&quality=96&sign=b8f7b4d77940120d97031abfae3bf543&type=album'
            }`}
            width="100px"
            height="100px"
          />
          <div className="ml-30">
            <h2 className="mt-0 mb-0">{fullname}</h2>
            <h3 className="mt-0 mb-0">@{username}</h3>
          </div>
          <Button className={clsx(classes.followBtn, 'ml-30')} color="blue">
            Follow
          </Button>
        </div>
      </div>
      <p className={classes.about}>{about}</p>
    </>
  );
};
