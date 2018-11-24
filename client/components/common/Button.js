import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'expo';

import theme from '../../constants/theme';
import Text from './Text';

const noop = () => {};

const getBg = props => {
  if (props.outline) return 'transparent';
  if (props.danger) return props.theme.errorColor;
  if (props.grey) return props.theme.greyLighter;
  return props.theme.primaryColor;
};

const getColor = props => {
  if (props.outline) {
    if (props.danger) return theme.errorColor;
    if (props.grey) return theme.textDark;
    return theme.primaryColor;
  }
  if (props.grey) return theme.greyDarkest;
  return '#fff';
};

const Button = props => {
  const {
    children,
    onPress,
    disabled,
    lg,
    color,
    icon,
    outline,
    ...rest
  } = props;

  return (
    <ButtonWrapper fade={disabled}>
      <ButtonBase
        onPress={disabled ? noop : onPress}
        disabled={disabled}
        lg={lg}
        outline={outline}
        {...rest}
      >
        {icon ? <Space lg={lg} /> : null}

        <TextContent>
          <Text size={lg ? 32 : 18} color={getColor(props)} bold={!!outline}>
            {children}
          </Text>
        </TextContent>

        {icon ? (
          <Icon.Feather
            name={icon}
            size={lg ? 40 : 20}
            color={getColor(props)}
          />
        ) : null}
      </ButtonBase>
    </ButtonWrapper>
  );
};

const Space = styled.View`
  width: ${props => (props.lg ? 48 : 24)}px;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  opacity: ${props => (props.fade ? 0.5 : 1)};
`;

const ButtonBase = styled.TouchableOpacity`
  width: 100%;
  height: ${props => (props.lg ? 72 : 48)}px;
  background-color: ${props => getBg(props)};
  border-color: ${props => getColor(props)};
  border-width: ${props => (props.outline ? 2 : 0)}px;
  padding-horizontal: ${props => (props.lg ? 24 : 16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

const TextContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

Button.propTypes = {
  children: PropTypes.any,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  lg: PropTypes.bool,
  color: PropTypes.string,
  icon: PropTypes.string,
  outline: PropTypes.bool,
};

export default Button;
