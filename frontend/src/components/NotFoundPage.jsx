import notFound from "../assets/not-found.svg";

const NotFoundPage = () => (
  <div className="d-flex flex-column h-100">
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={notFound} />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">Но вы можете перейти <a href="/">на главную страницу</a></p>
    </div>
  </div>
);

export default NotFoundPage;
