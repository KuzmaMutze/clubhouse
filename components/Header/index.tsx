import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import { Avatar } from '../Avatar';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className="container d-flex align-items-center justify-content-between">
        <Link href="/rooms">
          <div className={clsx(styles.headerLogo, 'd-flex align-items-center cup')}>
            <img src="/static/hand-wave.png" alt="Logo" className="mr-5" />
            <h4>Clubhouse</h4>
          </div>
        </Link>
        <Link href="/profile/1">
          <div className="d-flex align-items-center cup">
            <b className="mr-15">{'vasya'}</b>
            <Avatar
              src={
                'https://sun9-46.userapi.com/impf/c849128/v849128091/19d9d5/LGFbqmfRYKg.jpg?size=1606x1586&quality=96&sign=b8f7b4d77940120d97031abfae3bf543&type=album'
              }
              width="40px"
              height="40px"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
