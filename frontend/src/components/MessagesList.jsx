import { uniqueId } from 'lodash';

const MessagesList = ({ messagesList }) => {
  return (
    <div className="messages-area">
      {messagesList.map(({ username, body }) => {
        return <div key={uniqueId()} className="text-break mb-2"><b>{username}</b>: {body}</div>;
    })}
    </div>
  );
};

export default MessagesList;
