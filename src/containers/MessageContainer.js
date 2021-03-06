import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Comment } from 'semantic-ui-react';
import dayjs from 'dayjs';

import Messages from '../components/Messages';

const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;

const convertToDate = (timestamp) => {
  const stamp = timestamp.substring(0, 10);
  return dayjs.unix(stamp).format('MM/DD/YY hh:mm:ss');
};

class MessageContainer extends React.Component {
  componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.channelId);
  }

  componentWillReceiveProps({ channelId }) {
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.subscribe(channelId);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = channelId => this.props.data.subscribeToMore({
    document: newChannelMessageSubscription,
    variables: {
      channelId,
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData) {
        return prev;
      }

      return {
        ...prev,
        messages: [...prev.messages, subscriptionData.data.newChannelMessage],
      };
    },
  });

  render() {
    const {
      data: { loading, messages },
    } = this.props;
    return loading ? (
      'Loading...'
    ) : (
      <Messages>
        <Comment.Group>
          {!messages
            ? null
            : messages.map(m => (
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
    );
  }
}

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
  options: {
    fetchPolicy: 'network-only',
  },
})(MessageContainer);
