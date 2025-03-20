import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';
import App from './App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import channelsApi from './api/channelsApi.js';
import messagesApi from './api/messagesApi.js';

const init = async () => {
  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      debug: false,
    });

  const socket = io();

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('fetchChannels', undefined, (draft) => {
      draft.push(payload);
    }));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('fetchChannels', undefined, (draft) => {
      draft.filter((channel) => channel.id !== payload);
    }));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('fetchChannels', undefined, (draft) => {
      const channel = draft.find((item) => item.id === payload.id);
      channel.name = payload.name;
    }));
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesApi.util.updateQueryData('fetchMessages', undefined, (draft) => {
      draft.push(payload);
    }));
  });

  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  const ru = filter.getDictionary('ru');
  filter.add(ru);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <App />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
