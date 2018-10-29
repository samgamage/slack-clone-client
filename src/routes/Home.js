import React from 'react';
import { graphql, gql } from 'react-apollo';

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
