/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

// Form validation
import * as Yup from 'yup';
import {Formik} from 'formik';
// YOUTUBE:
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required'),
});
export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setupperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setupperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values);
              generatePasswordString(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#29AB87"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setupperCase(!upperCase)}
                    fillColor="#FED85D"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#FC80A5"
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}>
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}>
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>
              {password}
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 16,
    padding: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 16,
    color: 'teal',
  },
  subTitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  description: {
    color: '#777',
    marginBottom: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputWrapper: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 12,
    width: '40%',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#007BFF',
  },
  errorText: {
    fontSize: 14,
    color: '#FF0000',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  primaryBtn: {
    width: 140,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#007BFF',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    textAlign: 'center',
    width: 140,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#EFEFEF',
    borderWidth: 2,
    borderColor: '#555',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    color: '#555',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    backgroundColor: '#F7F7F7',
  },
  cardElevated: {
    elevation: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: '#FFF',
  },
  generatedPassword: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
});
