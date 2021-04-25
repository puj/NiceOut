import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

const LastFetchedContainer = styled.View`
  flex: 1;
`;
const LastFetchedTime = styled.Text`
  color: #afafaf;
  align-self: flex-end;
`;

export const LastFetched = ({ lastUpdated: lastFetched }) => {
  return (
    <LastFetchedContainer>
      <LastFetchedTime>{moment(lastFetched).fromNow()}</LastFetchedTime>
    </LastFetchedContainer>
  );
};
