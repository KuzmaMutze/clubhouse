import React from 'react';
import clsx from 'clsx';
import { WhiteBlock } from '../../WhiteBlock/WhiteBlock';
import { StepInfo } from '../../StepInfo/StepInfo';
import styles from './ChooseAvatarStep.module.scss';
import { Avatar } from '../../Avatar';
import { MainContext } from '../../../pages';
import { Button } from '../../Button/Button';

export const ChooseAvatarStep: React.FC = () => {
  const { onNextStep } = React.useContext(MainContext);
  const [avatar, setAvatar] = React.useState('')
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files[0]
    const imgUrl = URL.createObjectURL(file)
    setAvatar(imgUrl)
  };

  React.useEffect(() => {
    if (inputFileRef.current) {
      inputFileRef.current.addEventListener('change', handleChangeImage);
    }
  }, []);

  return (
    <div className={styles.block}>
      <StepInfo title="" icon="/static/celebration.png" description="How’s this photo?" />
      <WhiteBlock className={clsx('m-auto mt-40', styles.whiteBlock)}>
        <div className={styles.avatar}>
          <Avatar src={avatar}  width="120px" height="120px" />
        </div>
        <div className="mb-30">
          <label htmlFor="image" className="link cup">
            Choose a different photo
          </label>
        </div>
        <input id="image" ref={inputFileRef} type="file" hidden />
        <Button onClick={onNextStep}>
          Next
          <img  className="d-ib ml-10" src="/static/arrow.svg" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
