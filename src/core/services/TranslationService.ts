import LocalizedStrings from 'react-native-localization';
//translations
import en from '../../assets/translations/en';

/**
 * List of available languages.
 */
type Language = 'en';

let Translation = new LocalizedStrings({en});

/**
 * Returns translated string from source files.
 *
 * @param str - String contained in the translation source files.
 * @returns Translated string.
 *
 */
export const t = (str: string) => {
  return Translation.getString(str);
};

export default {
  t,
};
