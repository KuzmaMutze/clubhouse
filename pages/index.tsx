import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { ChooseAvatarStep } from '../components/steps/ChooseAvatarStep';
import { EnterCodeStep } from '../components/steps/EnterCodeStep';
import { EnterNameStep } from '../components/steps/EnterNameStep';
import { EnterPhoneStep } from '../components/steps/EnterPhoneStep';
import { GitHubStep } from '../components/steps/GitHubStep';
import { WelcomeStep } from '../components/steps/WelcomeStep/WelcomeStep';
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

  return (
    <MainContext.Provider value={{ step, onNextStep, userData, setUserData, setFiledValue }}>
      <Step />
    </MainContext.Provider>
  );
}
