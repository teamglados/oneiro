import styled from 'styled-components';

const Text = styled.Text`
  font-family: System;
  font-size: ${props => props.size || 16};
  font-weight: ${props => (props.bold ? 700 : 400)};
  text-decoration-line: ${props => (props.underline ? 'underline' : 'none')};
  color: ${props => props.color || props.theme.textDark};
  background-color: transparent;
`;

Text.defaultProps = {
  allowFontScaling: false,
};

export const getTextStyles = (props = {}) => ({
  fontFamily: 'System',
  fontSize: props.size || 16,
  fontWeight: props.bold ? '800' : '400',
  textDecorationLine: props.underline ? 'underline' : 'none',
  color: props.color || '#222',
  backgroundColor: 'transparent',
});

export default Text;
