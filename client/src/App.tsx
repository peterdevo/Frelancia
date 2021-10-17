import React, { useEffect, useState } from "react";
import agent from "./API/agent";
import Loading from "./components/Loading";
import Layout from "./layout/Layout";
import { JobProfile } from "./models/JobProfile";
import DashBoard from "./Views/dashboard/Dashboard";



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
      <DashBoard/>
    </Layout>
  );
}

export default App;
