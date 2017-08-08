import I18n from 'react-native-i18n';
import en from './locales/en';
import ptBR from './locales/pt-br';

I18n.locale = I18n.currentLocale();

I18n.translations = {
  'en': en,
  'pt-BR':  ptBR
}

export default I18n;
