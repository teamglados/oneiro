import styled, { css } from 'styled-components';

const Text = styled.Text`
  font-family: System;
  font-size: ${props => props.size || 16};
  font-weight: ${props => (props.bold ? 700 : 400)};
  text-decoration-line: ${props => (props.underline ? 'underline' : 'none')};
  color: ${props => props.color || props.theme.textDark};
  background-color: transparent;
  line-height: ${props => (props.size || 16) * 1.3};
  ${props =>
    props.center &&
    css`
      text-align: center;
    `}
`;

Text.defaultProps = {
  allowFontScaling: false,
};

export default Text;
