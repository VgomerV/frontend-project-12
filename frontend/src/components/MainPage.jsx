import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import Navbar from './Navbar.jsx';
import Channels from './Channels';
import Chat from './Chat';
import channelsApi, { useFetchChannelsQuery } from '../api/channelsApi.js';
import messagesApi, { useFetchMessagesQuery } from '../api/messagesApi.js';
import { addChannels, resetCurrentChannel } from '../slices/channelsSlice.js';
import { addMessages } from '../slices/messagesSlice.js';

const MainPage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  if (!token) {
    navigate('/login');
  }

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    data: channels,
    status: isChannelsLoading,
    isErrorFetchChannels
  } = useFetchChannelsQuery();
  const {
    data: messages,
    status: isMessagesLoading,
    isErrorFetchMessages
  } = useFetchMessagesQuery();

  const socket = io();
  socket.on('newMessage', () => {
    dispatch(messagesApi.util.invalidateTags(['Message']));
  });
  socket.on('newChannel', () => {
    dispatch(channelsApi.util.invalidateTags(['Channels']));
  });
  socket.on('removeChannel', () => {
    dispatch(channelsApi.util.invalidateTags(['Channels']));
    dispatch(messagesApi.util.invalidateTags(['Message']));
    dispatch(resetCurrentChannel());
  });
  socket.on('renameChannel', () => {
    dispatch(channelsApi.util.invalidateTags(['Channels']));
  });

  useEffect(() => {
    if (isErrorFetchChannels || isErrorFetchMessages) {
      toast.error(t('networkError'));
    }

    if (isChannelsLoading === 'fulfilled' && isMessagesLoading === 'fulfilled') {
      dispatch(addChannels({ channels }));
      dispatch(addMessages(messages));
    }
  }, [isChannelsLoading, isMessagesLoading, channels, dispatch, isErrorFetchChannels, isErrorFetchMessages, messages]);

  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
