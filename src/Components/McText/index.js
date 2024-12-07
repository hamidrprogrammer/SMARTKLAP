import styled from 'styled-components/native';
import { Fonts, Colors, Metrics } from '@/Constants';

const McText = styled.Text`
  /* default black */
  color: ${props => props.color || Colors.white};
  /* default 16px */
  font-size: ${props => props.size || Metrics.s16}px;
  /* default left */
  text-align: ${props => props.align || 'left'};
  font-family: "Poppins-Black";
  font-weight:  ${props =>  "bold" || "bold"};
  
  
`;

export default McText;
