import { io } from "socket.io-client";
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import channelsApi, { useFetchChannelsQuery } from '../api/channelsApi.js';
import messagesApi, { useFetchMessagesQuery } from '../api/messagesApi.js';
import Channels from './channels/Channels';
import Chat from './Chat';
import { logIn } from '../slices/authSlice.js';
import { addChannels } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';

const MainPage = () => {
  // localStorage.removeItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user.token) {
    return <Navigate to="/login" />;
  }

  const dispatch = useDispatch();

  dispatch(logIn(user));

  const { data: channels = [], status: isChannelsLoading } = useFetchChannelsQuery();
  const { data: messages = [], status: isMessagesLoading } = useFetchMessagesQuery();

  useEffect(() => {
    const socket = io();

    if (isChannelsLoading === 'fulfilled' && isMessagesLoading === 'fulfilled') {
      dispatch(addChannels({ channels }));
      dispatch(addMessages(messages));
    }

    socket.on('newMessage', () => {
      dispatch(messagesApi.util.invalidateTags(['Message']));
    });
    socket.on('newChannel', () => {
      dispatch(messagesApi.util.invalidateTags(['Channels']));
    });
  }, [isChannelsLoading, isMessagesLoading]);  

  return (
    <div className="d-flex flex-column h-100">
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className ="row h-100 bg-white flex-md-row'">
          <Channels />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
