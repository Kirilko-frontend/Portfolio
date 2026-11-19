import { createContext, useContext } from 'react';

/**
 * true — прелоадер закончился и можно запускать входные анимации секций.
 */
export const IntroContext = createContext(false);

export const useIntroDone = () => useContext(IntroContext);
