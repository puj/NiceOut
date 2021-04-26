import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { CustomTextComponent } from './CustomTextComponent';

const LastFetchedContainer = styled.View`
  flex: 1;
`;
const LastFetchedTime = styled(CustomTextComponent)`
  color: #afafaf;
  align-self: flex-end;
  font-size: 12px;
`;

export const LastFetched = () => {
  const lastFetched = new Date(
    useSelector((store) => store.weather.lastFetched)
  );
  const [refreshTimeout, setRefreshTimeout] = useState(null);

  useEffect(() => {
    if (!refreshTimeout) {
      const newTimeout = setTimeout(() => {
        setRefreshTimeout(null);
      }, 1000);
      setRefreshTimeout(newTimeout);
    }
    return () => {
      clearTimeout(refreshTimeout);
    };
  }, [refreshTimeout]);

  return (
    <LastFetchedContainer>
      <LastFetchedTime>{moment(lastFetched).fromNow()}</LastFetchedTime>
    </LastFetchedContainer>
  );
};
