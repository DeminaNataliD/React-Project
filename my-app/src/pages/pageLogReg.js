import { Link } from "react-router-dom";
import { CButtonLogOut } from "../components/buttonLogOut";
import { Header } from "../components/header";

export const PageLogReg = ({}) => {
  return (
    <div>
      
      <Link to={"/pageregistration"}>
        <p className="h-color">Зарегистрироваться</p>
      </Link>
      <Link to={`/pagelogin`}>
        <p className="h-color">Войти на сайт</p>
      </Link>
    </div>
  );
};
