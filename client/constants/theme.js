/* eslint-disable prettier/prettier */
import Color from 'color';

const primaryColor = '#008dde';
const errorColor = '#ff4b4b';
const infoColor = '#27aeda';
const warnColor = '#ffbf2f';
const successColor = '#80B636';

export default {
  primaryColorBase: Color(primaryColor),
  primaryColor,
  primaryColorLight: Color(primaryColor).lighten(0.1).hsl().string(),
  primaryColorLighter: Color(primaryColor).lighten(0.2).hsl().string(),
  primaryColorLightest: Color(primaryColor).lighten(0.3).hsl().string(),
  primaryColorDark: Color(primaryColor).darken(0.2).hsl().string(),
  primaryColorDarker: Color(primaryColor).darken(0.4).hsl().string(),
  primaryColorDarkest: Color(primaryColor).darken(0.6).hsl().string(),

  errorColorBase: Color(errorColor),
  errorColor,
  errorColorLight: Color(errorColor).lighten(0.1).hsl().string(),
  errorColorLighter: Color(errorColor).lighten(0.2).hsl().string(),
  errorColorLightest: Color(errorColor).lighten(0.3).hsl().string(),
  errorColorDark: Color(errorColor).darken(0.2).hsl().string(),
  errorColorDarker: Color(errorColor).darken(0.4).hsl().string(),
  errorColorDarkest: Color(errorColor).darken(0.6).hsl().string(),

  infoColorBase: Color(infoColor),
  infoColor,
  infoColorLight: Color(infoColor).lighten(0.1).hsl().string(),
  infoColorLighter: Color(infoColor).lighten(0.2).hsl().string(),
  infoColorLightest: Color(infoColor).lighten(0.3).hsl().string(),
  infoColorDark: Color(infoColor).darken(0.2).hsl().string(),
  infoColorDarker: Color(infoColor).darken(0.4).hsl().string(),
  infoColorDarkest: Color(infoColor).darken(0.6).hsl().string(),

  warnColorBase: Color(warnColor),
  warnColor,
  warnColorLight: Color(warnColor).lighten(0.1).hsl().string(),
  warnColorLighter: Color(warnColor).lighten(0.2).hsl().string(),
  warnColorLightest: Color(warnColor).lighten(0.3).hsl().string(),
  warnColorDark: Color(warnColor).darken(0.2).hsl().string(),
  warnColorDarker: Color(warnColor).darken(0.4).hsl().string(),
  warnColorDarkest: Color(warnColor).darken(0.6).hsl().string(),

  successColorBase: Color(successColor),
  successColor,
  successColorLight: Color(successColor).lighten(0.1).hsl().string(),
  successColorLighter: Color(successColor).lighten(0.2).hsl().string(),
  successColorLightest: Color(successColor).lighten(0.3).hsl().string(),
  successColorDark: Color(successColor).darken(0.2).hsl().string(),
  successColorDarker: Color(successColor).darken(0.4).hsl().string(),
  successColorDarkest: Color(successColor).darken(0.6).hsl().string(),

  grey: '#DFE3E8',
  greyLight: '#edeff2',
  greyLighter: '#F4F6F8',
  greyLightest: '#f7f9fc',
  greyDark: '#C4CDD5',
  greyDarker: '#919EAB',
  greyDarkest: '#637381',

  textDark: '#212B36',
  textLight: '#F9FAFB',
};