import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { WhiteBlock } from '../../WhiteBlock/WhiteBlock';
import { StepInfo } from '../../StepInfo/StepInfo';


import styles from './EnterPhoneStep.module.scss';
// import { MainContext } from '../../../pages';

export const EnterCodeStep = () => {
  const router = useRouter();
  // const { userData } = React.useContext(MainContext);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [codes, setCodes] = React.useState(['', '', '', '']);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    
  };

  const onSubmit =  (code: string) => {
    // try {
      
      router.push('/rooms');
    // } catch (error) {
    
    // }

    // setIsLoading(false);
  };

  return (
    <div className={styles.block}>
      {!isLoading ? (
        <>
          <StepInfo icon="/static/numbers.png" title="Enter your activate code" />
          <WhiteBlock className={clsx('m-auto mt-30', styles.whiteBlock)}>
            <div className={styles.codeInput}>
              {codes.map((code, index) => (
                <input
                  key={index}
                  type="tel"
                  placeholder="X"
                  maxLength={1}
                  id={String(index)}
                  onChange={handleChangeInput}
                  value={code}
                />
              ))}
            </div>
          </WhiteBlock>
        </>
      ) : (
        <div className="text-center">
          <div className="loader"></div>
          <h3 className="mt-5">Activation in progress ...</h3>
        </div>
      )}
    </div>
  );
};
