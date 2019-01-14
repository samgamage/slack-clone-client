import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Home = ({ data: { loading, allUsers } }) => (loading
  ? null
  : allUsers.map(u => (
    <h1 key={u.id}>
      {u.email}
      <br />
      {u.username}
    </h1>
  )));

const allUsersQuery = gql`
  {
    allUsers {
      id
      email
      username
    }
  }
`;
export default graphql(allUsersQuery)(Home);
