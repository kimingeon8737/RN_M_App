import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import styled from "styled-components/native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const StyledText = styled(Text)`
  color: ${(props) => props.color};
  margin-top: 50;
  font-weight: 600;
  font-size: 178;
`;

const StyledDes = styled(Text)`
  margin-top: -30;
  font-size: 60;
`;

const StyledView = styled(View)`
  width: ${SCREEN_WIDTH};
  align-items: center;
`;

export default function ImgButton(props) {
  return (
    <StyledView>
      <StyledText color={props.color}>27</StyledText>
      <StyledDes>Sunny</StyledDes>
    </StyledView>
  );
}
