import { Redirect, Route } from "react-router";
import { RouteProps } from "react-router-dom";

interface IProps extends RouteProps {
  isAuth: boolean;
}

const ProtectedRoute = ({ isAuth, ...routeProps }: IProps) => {
  if (isAuth) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default ProtectedRoute;
