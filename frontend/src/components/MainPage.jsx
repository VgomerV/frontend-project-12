import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import getRoute from '../utilites/routes';
import Navbar from './Navbar.jsx';
import Channels from './Channels';
import Chat from './Chat';
import { useFetchChannelsQuery } from '../api/channelsApi.js';
import { useFetchMessagesQuery } from '../api/messagesApi.js';

const MainPage = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!token) {
    navigate(getRoute('login').replace(/^\/api\/v1/, ''));
  }

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    data: channels,
    isErrorFetchChannels,
  } = useFetchChannelsQuery();
  const {
    data: messages,
    isErrorFetchMessages,
  } = useFetchMessagesQuery();

  useEffect(() => {
    if (isErrorFetchChannels || isErrorFetchMessages) {
      toast.error(t('networkError'));
    }
  }, [
    channels,
    dispatch,
    isErrorFetchChannels,
    isErrorFetchMessages,
    messages,
    t,
  ]);

  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels channels={channels ?? []}/>
          <Chat messages={messages ?? []}/>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
