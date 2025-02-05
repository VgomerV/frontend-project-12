const MessagesList = (storeMessages) => {
  const keys = storeMessages.messages.ids;
  const messages = storeMessages.messages.entities;

  return (
    <div className="messages-area">
      {keys.map((key) => {
        const { username, body } = messages[key];
        return <div className = 'text-break mb-2'><b>{username}</b>: {body}</div>;
    })}
    </div>
  );
};

export default MessagesList;
