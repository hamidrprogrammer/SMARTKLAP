import {Dimensions, Platform} from 'react-native';
import {
  ICommonTheme,
  ThemeAssets,
  ThemeFonts,
  ThemeIcons,
  ThemeLineHeights,
  ThemeWeights,
} from './types';

const {width, height} = Dimensions.get('window');

// Naming source: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
export const WEIGHTS: ThemeWeights = {
  text: 'normal',
  h1: Platform.OS === 'ios' ? '700' : 'normal',
  h2: Platform.OS === 'ios' ? '700' : 'normal',
  h3: Platform.OS === 'ios' ? '700' : 'normal',
  h4: Platform.OS === 'ios' ? '700' : 'normal',
  h5: Platform.OS === 'ios' ? '600' : 'normal',
  p: 'normal',

  thin: Platform.OS === 'ios' ? '100' : 'normal',
  extralight: Platform.OS === 'ios' ? '200' : 'normal',
  light: Platform.OS === 'ios' ? '300' : 'normal',
  normal: Platform.OS === 'ios' ? '400' : 'normal',
  medium: Platform.OS === 'ios' ? '500' : 'normal',
  semibold: Platform.OS === 'ios' ? '600' : 'normal',
  bold: Platform.OS === 'ios' ? '700' : 'normal',
  extrabold: Platform.OS === 'ios' ? '800' : 'normal',
  black: Platform.OS === 'ios' ? '900' : 'normal',
};

export const ICONS: ThemeIcons = {
  apple: require('../../assets/apple.png'),
  google: require('../../assets/google.png'),
  facebook: require('../../assets/facebook.png'),
  arrow: require('../../assets/arrow.png'),
  articles: require('../../assets/articles.png'),
  basket: require('../../assets/basket.png'),
  bell: require('../../assets/bell.png'),
  calendar: require('../../assets/calendar.png'),
  chat: require('../../assets/chat.png'),
  check: require('../../assets/check.png'),
  clock: require('../../assets/clock.png'),
  close: require('../../assets/close.png'),
  components: require('../../assets/components.png'),
  document: require('../../assets/document.png'),
  documentation: require('../../assets/documentation.png'),
  extras: require('../../assets/extras.png'),
  flight: require('../../assets/flight.png'),
  home: require('../../assets/home.png'),
  hotel: require('../../assets/hotel.png'),
  image: require('../../assets/image.png'),
  location: require('../../assets/location.png'),
  menu: require('../../assets/menu.png'),
  more: require('../../assets/more.png'),
  notification: require('../../assets/notification.png'),
  office: require('../../assets/office.png'),
  payment: require('../../assets/payment.png'),
  profile: require('../../assets/profile.png'),
  register: require('../../assets/register.png'),
  rental: require('../../assets/rental.png'),
  search: require('../../assets/search.png'),
  settings: require('../../assets/settings.png'),
  star: require('../../assets/star.png'),
  train: require('../../assets/train.png'),
  users: require('../../assets/users.png'),
  warning: require('../../assets/warning.png'),
};

export const ASSETS: ThemeAssets = {
  // fonts
  OpenSansLight: require('../../assets/fonts/OpenSans-Light.ttf'),
  OpenSansRegular: require('../../assets/fonts/OpenSans-Regular.ttf'),
  OpenSansSemiBold: require('../../assets/fonts/OpenSans-SemiBold.ttf'),
  OpenSansExtraBold: require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
  OpenSansBold: require('../../assets/fonts/OpenSans-Bold.ttf'),

  // backgrounds/logo
  logo: require('../../assets/logo.png'),
  header: require('../../assets/header.png'),
  background: require('../../assets/background.png'),
  ios: require('../../assets/ios.png'),
  android: require('../../assets/android.png'),

  // cards
  card1: require('../../assets/card1.png'),
  card2: require('../../assets/card2.png'),
  card3: require('../../assets/card3.png'),
  card4: require('../../assets/card4.png'),
  card5: require('../../assets/card5.png'),

  // gallery photos
  photo1: require('../../assets/photo1.png'),
  photo2: require('../../assets/photo2.png'),
  photo3: require('../../assets/photo3.png'),
  photo4: require('../../assets/photo4.png'),
  photo5: require('../../assets/photo5.png'),
  photo6: require('../../assets/photo6.png'),
  carousel1: require('../../assets/carousel1.png'),

  // avatars
  avatar1: require('../../assets/avatar1.png'),
  avatar2: require('../../assets/avatar2.png'),

  // cars
  x5: require('../../assets/x5.png'),
  gle: require('../../assets/gle.png'),
  tesla: require('../../assets/tesla.png'),
};

export const FONTS: ThemeFonts = {
  // based on font size
  text: 'OpenSans-Regular',
  h1: 'OpenSans-Bold',
  h2: 'OpenSans-Bold',
  h3: 'OpenSans-Bold',
  h4: 'OpenSans-Bold',
  h5: 'OpenSans-SemiBold',
  p: 'OpenSans-Regular',

  // based on fontWeight
  thin: 'OpenSans-Light',
  extralight: 'OpenSans-Light',
  light: 'OpenSans-Light',
  normal: 'OpenSans-Regular',
  medium: 'OpenSans-SemiBold',
  semibold: 'OpenSans-SemiBold',
  bold: 'OpenSans-Bold',
  extrabold: 'OpenSans-ExtraBold',
  black: 'OpenSans-ExtraBold',
};

export const LINE_HEIGHTS: ThemeLineHeights = {
  // font lineHeight
  text: 22,
  h1: 60,
  h2: 55,
  h3: 43,
  h4: 33,
  h5: 24,
  p: 22,
};

export const THEME: ICommonTheme = {
  icons: ICONS,
  assets: {...ICONS, ...ASSETS},
  fonts: FONTS,
  weights: WEIGHTS,
  lines: LINE_HEIGHTS,
  sizes: {width, height},
};
