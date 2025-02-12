import axios from 'axios';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import MessagesList from './MessagesList';

const Chat = () => {
  const { channels, messages } = useSelector((state) => state);
  const { currentChannelID } = channels;

  let currentChannel = '';
  if (channels.entities[currentChannelID]) {
    const { name } = channels.entities[currentChannelID];
    currentChannel = name;
  }

  const { ids, entities } = messages;
  const messagesList = ids.map(id => entities[id]).filter((message) => message.channelId === currentChannelID);
  const countMessages = messagesList.length;

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: (values, { resetForm }) => {
        const newMessage = { body: values.message, channelId: currentChannelID, username: 'admin' };
        axios.post('/api/v1/messages', newMessage, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        }).then(({ data }) => {
          console.log('WORK CONSOL');
        });
        resetForm();
    },
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {currentChannel}</b></p>
          <span className="text-muted">{countMessages} сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          <MessagesList messagesList={messagesList} />
        </div>
        <div className="mt-auto px-5 py-3">
          <form novalidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
            <div className="input-group has-validation">
              <input 
                name="message"
                type="message"
                aria-label="Новое сообщение"
                className="border-0 p-0 ps-2 form-control"
                placeholder="Введите сообщение..."
                value={formik.values.message}
                onChange={formik.handleChange}
              />
              <button type="submit" disabled="" className="btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path 
                    fill-rule="evenodd" 
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z">
                  </path>
                </svg>
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;