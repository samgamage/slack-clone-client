import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import Messages from '../components/Messages';

const convertToDate = (timestamp) => {
  const stamp = timestamp.substring(0, 10);
  const date = new Date(stamp * 1000);
  return date.toLocaleString();
};

const MessageContainer = ({ data: { loading, messages } }) => (loading ? null : (
  <Messages>
    <Comment.Group>
      {messages.map(m => (
        <Comment key={`${m.id}-message`}>
          <Comment.Content>
            <Comment.Author as="a">{m.user.username}</Comment.Author>
            <Comment.Metadata>
              <div>{convertToDate(m.created_at)}</div>
            </Comment.Metadata>
            <Comment.Text>{m.text}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  </Messages>
));

const messagesQuery = gql`
  query($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;

export default graphql(messagesQuery, {
  variables: props => ({
    channelId: props.channelId,
  }),
})(MessageContainer);