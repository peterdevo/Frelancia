import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Loading from "../../../../components/Loading";
import { useStore } from "../../../../stores/store";
import JobProfileComponent from "./jobprofilecomponent/JobProfileComponent";

const EditJobProfile = () => {
  const { profileStore } = useStore();

  useEffect(() => {
    profileStore.loadProfiles();
  }, [profileStore]);

  if(profileStore.isLoading)return <Loading/>
  return (
    <>
      {profileStore.jobProfiles.map((jp) => {
        return <JobProfileComponent key={jp.nicheId} jobProfile={jp} />;
      })}
    </>
  );
};

export default observer(EditJobProfile);
