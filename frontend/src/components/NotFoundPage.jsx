import { useTranslation } from 'react-i18next';
import notFound from '../assets/not-found.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <div className="text-center">
        <img alt={t('notFoundPage.title')} className="img-fluid h-25" src={notFound} />
        <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
        <p className="text-muted">
          {t('notFoundPage.text')}
          <a href="/">
            {t('notFoundPage.link')}
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
