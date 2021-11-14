import DashBoard from "./features/jobsdashboard/Dashboard";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./errors/NotFound";
import ServerErrors from "./errors/ServerErrors";
import Entry from "./features/entrance/Entry";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { commonStore } = useStore();
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Switch>
        <Route exact path="/" component={Entry} />
        <ProtectedRoute
          isAuth={commonStore.token ? true : false}
          path="/dashboard"
          component={DashBoard}
        />
        <Route path="/server-error" component={ServerErrors} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default observer(App);
