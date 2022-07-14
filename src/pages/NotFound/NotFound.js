import errorNotFound from "../../assets/img/error-notFound.png";
import "./style.css";

export const NotFound = () => {
  return (
    <section class="notFound">
      <h2>Not Found</h2>
      <img src={errorNotFound} alt="Not Found" />
    </section>
  );
};

