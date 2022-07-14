import "./notFound.css";

const NotFound = () => {
  return (
    <div class="not-found-container">
      <h2>Oops! Page not found.</h2>
      <h1>404</h1>
      <p>We can't find the page you're looking for.</p>
      <div>
        <a href="/tasks">Go back home</a>
      </div>
    </div>
  );
};

export default NotFound;
