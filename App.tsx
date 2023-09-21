/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  passworddLength: Yup.number()
    .min(4, 'should be min 4 chars')
    .max(16, 'should nt be max 16 chars')
    .required('password required'),
});
export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGen, setIsPassGen] = useState(false);

  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  //   console.log("pass", password)
  const generatePasswordString = (passwordLength: number) => {
    //
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(charIndex);
    }
    return result;
  };

  const resetPassword = () => {
    //
  };

  return (
    <View>
      <Text>App</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
