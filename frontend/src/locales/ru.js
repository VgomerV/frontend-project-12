export default {
  translation: {
    notFoundPage: {
      title: 'Страница не найдена',
      text: 'Но вы можете перейти ',
      link: 'на главную страницу',
    },
    navbar: {
      title: 'Hexlet Chat',
      logOutBtn: 'Выйти',
    },
    loginPage: {
      title: 'Войти',
      usernameField: 'Ваш ник',
      passwordField: 'Пароль',
      error: 'Неверные имя пользователя или пароль',
      submit: 'Войти',
      footerText: 'Нет аккаунта? ',
      footerLink: 'Регистрация',
    },
    registration: {
      title: 'Регистрация',
      usernameField: 'Имя пользователя',
      passwordField: 'Пароль',
      confirmField: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      errors: {
        require: 'Обязательное поле',
        usernameField: 'От 3 до 20 символов',
        passwordField: 'Не менее 6 символов',
        confirmField: 'Пароли должны совпадать',
      },
    },
    chatPage: {
      countMessages: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      messageField: 'Введите сообщение...',
      areaMessages: 'Новое сообщение',
      submit: 'Отправить',
    },
    channels: {
      title: 'Каналы',
      controlTitle: 'Управление каналом',
      btnRemove: 'Удалить',
      btnRename: 'Переименовать',
    },
    modals: {
      label: 'Имя канала',
      errors: {
        require: 'Обязательное поле',
        maxMinLength: 'От 3 до 20 символов',
        unique: 'Должно быть уникальным',
      },
      add: {
        title: 'Добавить канал',
        submit: 'Отправить',
        cancell: 'Отменить',
      },
      remove: {
        title: 'Удалить канал',
        question: 'Уверены?',
        submit: 'Удалить',
        cancell: 'Отменить',
      },
      rename: {
        title: 'Переименовать канал',
        submit: 'Отправить',
        cancell: 'Отменить',
      },
    },
    toasts: {
      add: 'Канал создан',
      remove: 'Канал удалён',
      rename: 'Канал переименован',
    },
    networkError: 'Ошибка соединения',
    errorRegistration: 'Такой пользователь уже существует',
  },
};
