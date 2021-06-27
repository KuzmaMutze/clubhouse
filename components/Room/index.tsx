import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '../Button/Button';

import styles from './Room.module.scss';
import { useSelector } from 'react-redux';

interface RoomProps {
  title: string;
}

export const Room: React.FC<RoomProps> = ({ title }) => {
  const router = useRouter();
  const roomId = router.query.id;

  return (
    <div className={styles.wrapper}>
      {/* <audio controls /> */}
      <div className="d-flex align-items-center justify-content-between">
        <h2>{title}</h2>
        <div className={clsx('d-flex align-items-center', styles.actionButtons)}>
          <Link href={`/rooms/${roomId}`}>
            <a>
              <Button color="gray" className={styles.leaveButton}>
                <img width={18} height={18} src="/static/peace.png" alt="Hand black" />
                Leave quietly
              </Button>
            </a>
          </Link>
        </div>
      </div>

      <div className="users">{/* <Speaker /> */}</div>
    </div>
  );
};
