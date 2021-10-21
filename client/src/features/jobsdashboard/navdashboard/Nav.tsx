import AccountImg from "../../../components/AccountImg";
import ButtonComponent from "../../../components/ButtonComponent";
import CardComponent from "../../../components/CardComponent";
import Viewer from "../../../components/Viewer";

const Nav = () => {
  return (
    <>
      <CardComponent
        CustomStyle={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <AccountImg />
        <div>
          <ButtonComponent path="/dashboard/createprofile" text="Create profile" btnColor="#D4955A" />
          <ButtonComponent path="/dashboard/createjob" text="Create job" btnColor="#5A8BD4" />
          <ButtonComponent path="/dashboard/profile" text="View profile" btnColor="#9F5AD4" />
          <ButtonComponent path="/dashboard/interest" text="Interested" btnColor="#56BBB5" />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Viewer views="10" />
        </div>

       
      </CardComponent>
    </>
  );
};

export default Nav;
