import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

const LastUpdatedContainer = styled.View`
  flex: 1;
`;
const LastUpdatedTime = styled.Text`
  color: #afafaf;
  align-self: flex-end;
`;

export const LastUpdated = ({ lastUpdated }) => {
  return (
    <LastUpdatedContainer>
      <LastUpdatedTime>{moment(lastUpdated).fromNow()}</LastUpdatedTime>
    </LastUpdatedContainer>
  );
};
