import axios from 'axios';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useFormik } from 'formik';
import { uniqueId } from 'lodash';
import { useAddMessageMutation } from '../api/messagesApi.js';

const Chat = ({ messages }) => {
  const { auth, currentChannel } = useSelector((state) => state);
  const { token, username } = auth;
  const { currentChannelID, currentChannelName } = currentChannel;
  const currentMessages = messages.filter((message) => message.channelId === currentChannelID);
  const countMessages = currentMessages.length;
  const [addMessage] = useAddMessageMutation();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const newMessage = {
        body: filter.clean(values.message),
        channelId: currentChannelID,
        username,
      };
      await addMessage(newMessage);
      resetForm();
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {'# '}
              {currentChannelName}
            </b>
          </p>
          <span className="text-muted">{t('chatPage.countMessages.count', { count: countMessages })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentMessages.map((message) => (
            <div key={uniqueId()} className="text-break mb-2">
              <b>{message.username}</b>
              {`: ${message.body}`}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form className="py-1 border rounded-2" noValidate onSubmit={formik.handleSubmit}>
            <InputGroup hasValidation={formik.values.message === ''}>
              <Form.Control
                type="text"
                className="border-0 p-0 ps-2"
                name="message"
                aria-label={t('chatPage.areaMessages')}
                placeholder={t('chatPage.messageField')}
                value={formik.values.message}
                onChange={formik.handleChange}
                ref={inputRef}
              />
              <button type="submit" className="btn btn-group-vertical" disabled={formik.values.message === ''}>
                <ArrowRightSquare width="20" height="20" />
                <span className="visually-hidden">{t('chatPage.submit')}</span>
              </button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
