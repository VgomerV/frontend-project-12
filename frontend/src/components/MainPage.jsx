import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './Navbar.jsx';
import channelsApi, { useFetchChannelsQuery } from '../api/channelsApi.js';
import messagesApi, { useFetchMessagesQuery } from '../api/messagesApi.js';
import Channels from './channels/Channels';
import Chat from './Chat';
// import { logIn } from '../slices/authSlice.js';
import { addChannels, resetCurrentChannel } from '../slices/channelsSlice';
import { addMessages } from '../slices/messagesSlice';

const MainPage = () => {
  // localStorage.removeItem('token');
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  
  if (!token) {
    navigate('/login');
  }

  const dispatch = useDispatch();

  const { data: channels, status: isChannelsLoading } = useFetchChannelsQuery();
  const { data: messages, status: isMessagesLoading } = useFetchMessagesQuery();

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
      dispatch(channelsApi.util.invalidateTags(['Channels']));
    });
    socket.on('removeChannel', () => {
      dispatch(resetCurrentChannel());
      dispatch(channelsApi.util.invalidateTags(['Channels']));
      dispatch(messagesApi.util.invalidateTags(['Message']));
    });
    socket.on('renameChannel', () => {
      dispatch(channelsApi.util.invalidateTags(['Channels']));
    });
  }, [isChannelsLoading, isMessagesLoading]);

  useEffect(() => console.log('RENDER MAIN PAGE'), []);

  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className ="row h-100 bg-white flex-md-row">
          <Channels />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
