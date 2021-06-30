import React from 'react';
import clsx from 'clsx';
import { WhiteBlock } from '../../WhiteBlock/WhiteBlock';
import { StepInfo } from '../../StepInfo/StepInfo';
import styles from './ChooseAvatarStep.module.scss';
import { Avatar } from '../../Avatar';
import { MainContext } from '../../../pages';
import { Button } from '../../Button/Button';
import Axios from '../../../api/api';

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('photo', file);
  const { data } = await Axios.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const ChooseAvatarStep: React.FC = () => {
  const { onNextStep, setFiledValue, userData } = React.useContext(MainContext);
  const [avatar, setAvatar] = React.useState(userData.avatarUrl);
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeImage = async (event: Event) => {
    const targer = event.target as HTMLInputElement;
    const file = targer.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setAvatar(imgUrl);
      const data = await uploadFile(file);
      console.log(data);
      targer.value = '';
      setAvatar(data.url);
      setFiledValue('avatarUrl', data.url);
    }
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
          <Avatar src={avatar} width="120px" height="120px" />
        </div>
        <div className="mb-30">
          <label htmlFor="image" className="link cup">
            Choose a different photo
          </label>
        </div>
        <input id="image" ref={inputFileRef} type="file" hidden />
        <Button onClick={onNextStep}>
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
