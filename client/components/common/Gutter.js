import styled from 'styled-components';

// prettier-ignore
const Gutter = styled.View`
  ${props => !props.vertical && `width: ${props.amount || 16};`}
  ${props => props.vertical && `height: ${props.amount || 16};`};
`;

export default Gutter;
