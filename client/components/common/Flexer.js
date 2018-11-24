import styled from 'styled-components';

const Flexer = styled.View`
  flex: ${props => props.amount || 1};
`;

export default Flexer;
