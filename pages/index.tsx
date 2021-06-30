import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useState } from 'react';
import instance from '../api/api';
import { ChooseAvatarStep } from '../components/steps/ChooseAvatarStep';
import { EnterCodeStep } from '../components/steps/EnterCodeStep';
import { EnterNameStep } from '../components/steps/EnterNameStep';
import { EnterPhoneStep } from '../components/steps/EnterPhoneStep';
import { GitHubStep } from '../components/steps/GitHubStep';
import { WelcomeStep } from '../components/steps/WelcomeStep/WelcomeStep';
import { checkAuth } from '../helpers/checkAuth';
import { User } from '../types/types';

const stepsComponents = {
  0: WelcomeStep,
  1: GitHubStep,
  2: EnterNameStep,
  3: ChooseAvatarStep,
  4: EnterPhoneStep,
  5: EnterCodeStep,
};

type MainContext = {
  onNextStep: () => void;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  step: number;
  setFiledValue: (field: keyof User, value: string) => void;
  userData: User;
};

const getUserData = (): User | null => {
  try {
    return JSON.parse(window.localStorage.getItem('userData'));
  } catch (error) {
    return null;
  }
};

const getFormStep = (): number => {
  if (typeof window !== 'undefined') {
    const json = getUserData();
    if (json) {
      if (json.phone) {
        return 5;
      } else {
        return 4;
      }
    }
  }
  return 0;
};

export const MainContext = React.createContext<MainContext>({} as MainContext);

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const [userData, setUserData] = useState<User>();
  const Step = stepsComponents[step];

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const setFiledValue = (field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const json = getUserData();
      if (json) {
        setUserData(json);
      }
      setStep(getFormStep());
    }
  }, []);

  useEffect(() => {
    if (userData) {
      window.localStorage.setItem('userData', userData ? JSON.stringify(userData) : '');
      instance.defaults.headers.Authorization = 'Bearer ' + userData.token;
    }
  }, [userData]);

  return (
    <MainContext.Provider value={{ step, onNextStep, userData, setUserData, setFiledValue }}>
      <Step />
    </MainContext.Provider>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const user = await checkAuth(ctx);
    console.log(user, 'USER DATA !!!!!!!!!!!!!!!!!!!!!!!');

    if (user) {
      return {
        props: {},
        redirect: {
          destination: '/rooms',
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error('Error with checkAuth', error);
  }
  return {
    props: {},
  };
};
