import {ErrorPage} from "./ErrorPage";

export default function Unauthorized() {
  return (
    <ErrorPage
      code={401}
      title="Unauthorized"
      message="You must be logged in to access this page."
    />
  );
}
