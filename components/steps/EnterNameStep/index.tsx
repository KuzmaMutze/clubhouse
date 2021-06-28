import clsx from 'clsx';
import { WhiteBlock } from '../../WhiteBlock/WhiteBlock';
import { Button } from '../../Button/Button';
import { StepInfo } from '../../StepInfo/StepInfo';

import styles from './EnterNameStep.module.scss';
import React from 'react';
import { MainContext } from '../../../pages';
import { Avatar } from '../../Avatar';

export const EnterNameStep = () => {
  const { onNextStep, userData, setFiledValue } = React.useContext(MainContext);
  const [inputValue, setInputValue] = React.useState<string>(userData.username);
  const nextDisabled = !inputValue;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const onClickNextStep = () => {
    setFiledValue('fullname', inputValue);
    onNextStep();
  };

  return (
    <div className={styles.block}>
      <StepInfo
        icon="/static/man.png"
        title="What’s your full name?"
        description="People use real names on Clubhouse :) Thnx!"
      />
      <WhiteBlock className={clsx('m-auto', styles.whiteBlock)}>
        <Avatar src={userData.avatarUrl} width="120px" height="120px" />
        <div className="mt-30 mb-30">
          <input
            onChange={handleChangeInput}
            value={inputValue}
            className="field"
            placeholder="Enter fullname"
          />
        </div>
        <Button disabled={nextDisabled} onClick={onClickNextStep}>
          Next
          <img className="d-ib ml-10" src="/static/arrow.svg" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
