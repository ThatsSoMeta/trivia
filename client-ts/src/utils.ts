import React from 'react';
import { InputType } from 'zlib';

export const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

