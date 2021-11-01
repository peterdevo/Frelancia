const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor:"khaki",
        height:"50vh",
      }}
    >
      <h1>404</h1>
      <h1 style={{borderLeft:"1px solid black"}}>Sorry,the page you're looking for was not found!</h1>
    </div>
  );
};

export default NotFound;
