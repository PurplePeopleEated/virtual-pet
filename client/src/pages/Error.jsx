import { useRouteError } from 'react-router-dom';

export default function Error() {
  const err = useRouteError();
  console.error(err);

  return (
    <div>
      <h1>Uh Oh!</h1>
      <p>An error has occurred.</p>
      <p>
        <i>{err.statusText || err.message}</i>
      </p>
    </div>
  );
}