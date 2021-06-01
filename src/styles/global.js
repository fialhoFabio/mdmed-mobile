import {StyleSheet} from 'react-native';

export const appMargin = {
  horizontal: 16,
  vertical: 16,
};

export const colors = {
  activityIndicator: '#228CDB',
  antiFlashWhite: '#F2EFF2',
  errorBackground: '#E7E2E6',
  formColorWarningFieldBg: '#fef6e8',
  formColorWarningFieldBorder: '#FEA102',
  formColorWarningText: '#FEA102',
  main: '#D51F26',
  textSecondary: '#928F91',
};

export const fontSizes = {
  big_3: 20,
  small_2: 12,
};

export default StyleSheet.create({
  buttonText: {
    color: '#FFFFFF',
  },
  container: {
    borderColor: '#E0DADF',
    borderRadius: 8,
    borderWidth: 1,
  },
  containerTouchable: {
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DAD2D8',
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
    height: 56,
    paddingHorizontal: 16,
  },
  inputErrorMessage: {
    color: colors.formColorWarningText,
  },
  inputIcon: {
    fontSize: 16,
  },
  inputWithError: {
    backgroundColor: colors.formColorWarningFieldBg,
    borderColor: colors.formColorWarningFieldBorder,
  },
});
