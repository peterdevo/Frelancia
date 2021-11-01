import Layout from "./layout/Layout";
import DashBoard from "./features/jobsdashboard/Dashboard";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./errors/NotFound";
import ServerErrors from "./errors/ServerErrors";

function App() {
  return (
    <Layout>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Switch>
        <Route path="/dashboard">
          <DashBoard />
        </Route>
        <Route path="/server-error" component={ServerErrors} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
