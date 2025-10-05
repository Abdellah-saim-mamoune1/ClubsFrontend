import {ErrorPage} from "./ErrorPage";

export default function NetworkError() {
  return (
    <ErrorPage
      code={0}
      title="Network Error"
      message="Unable to connect to the server. Check your internet connection."
    />
  );
}
