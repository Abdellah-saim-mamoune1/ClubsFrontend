import {ErrorPage} from "./ErrorPage";

export default function GenericError() {
  return (
    <ErrorPage
      code={999}
      title="Unexpected Error"
      message="An unknown error occurred. Please try again."
    />
  );
}
