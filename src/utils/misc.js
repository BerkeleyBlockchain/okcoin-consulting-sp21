/* eslint-disable import/prefer-default-export */
import startcase from 'lodash.startcase';
import lowercase from 'lodash.lowercase';

export const cleanText = (text) => startcase(lowercase(text));
