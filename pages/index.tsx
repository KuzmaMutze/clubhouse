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
  step: number;
};

export const MainContext = React.createContext<MainContext>({} as MainContext);

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const Step = stepsComponents[step];

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <MainContext.Provider value={{ step, onNextStep }}>
      <Step />
    </MainContext.Provider>
  );
}
