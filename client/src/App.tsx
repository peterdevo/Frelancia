import React, { useEffect, useState } from "react";
import agent from "./API/agent";
import Loading from "./components/Loading";
import Layout from "./layout/Layout";
import DashBoard from "./features/jobsdashboard/Dashboard";
import { Route, Switch } from "react-router-dom";
import { JobProfile } from "./models/JobProfile";

function App() {
  const [jobProfile, SetJobProfile] = useState<JobProfile[]>();
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    agent.profileJobs
      .list()
      .then((data) => console.log(data))
      .then(() => setIsloading(false));
  }, []);

  if (isLoading) return <Loading />;
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
