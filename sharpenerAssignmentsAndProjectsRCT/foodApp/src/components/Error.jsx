import { useRouteError } from "react-router-dom";
const Error = () => {
  const { data, status, statusText } = useRouteError();
  return (
    <div>
      <h2>Something went wrong</h2>
      <h3>
        {status}:{statusText}
      </h3>
      <h4>Error message: {data}</h4>
    </div>
  );
};

export default Error;
