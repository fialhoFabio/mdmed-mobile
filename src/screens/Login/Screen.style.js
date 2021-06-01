import {StyleSheet} from 'react-native';
import {appMargin} from '../../styles/global';

export default StyleSheet.create({
  contentWrapper: {
    flex: 1,
    marginHorizontal: appMargin.horizontal,
    marginVertical: appMargin.vertical,
  },
  contentWrapperBottom: {
    flex: 1,
  },
  contentWrapperTop: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: 100,
    width: 200,
  },
  inputMessageWrapper: {
    marginBottom: 8,
  },
  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
  },
  submitButton: {
    justifyContent: 'center',
    width: '100%',
  },
});
