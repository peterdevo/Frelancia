
import Layout from "./layout/Layout";
import DashBoard from "./features/jobsdashboard/Dashboard";
import { Route, Switch } from "react-router-dom";


function App() {

  return (
    <Layout>
      <Switch>
        <Route path="/dashboard">
          <DashBoard />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
