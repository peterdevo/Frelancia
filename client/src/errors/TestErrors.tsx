import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ValidationErrors from "./ValidationErrors";

const TestErrors = () => {

  const [errors,setErrors]=useState<string[]>([]);
  
  const baseURl = "http://localhost:5000/";

  const handleNotFound = () => {
    axios.get(baseURl + 'buggy/not-found').catch(error=>console.log(error.response))
  };

  const handleBadRequest = () => {
    axios.get(baseURl + 'buggy/bad-request').catch(error=>console.log(error.response))
  };
  const handleServerError = () => {
    axios.get(baseURl + 'buggy/server-error').catch(error=>console.log(error.response))
  };
  const handleUnauthorized = () => {
    axios.get(baseURl + 'buggy/unauthorized').catch(error=>console.log(error.response))
  };

  const handleValidationError = () => {
    axios.post(baseURl + 'profile',{}).catch(error=>setErrors(error))
  };

  const handleBadGuid = () => {
    axios.get(baseURl + 'profile/gg',{}).catch(error=>console.log(error))
  };

  return (
    <>
      <Button onClick={handleNotFound}>Not found</Button>
      <Button onClick={handleBadRequest}>Bad request</Button>
      <Button onClick={handleServerError}>Server error</Button>
      <Button onClick={handleUnauthorized}>Unauthorized</Button>
      <Button onClick={handleValidationError}>ValidationError</Button>
      <Button onClick={handleBadGuid}>BadGuid</Button>

      {errors.length>0&&<ValidationErrors errors={errors}/>}
    </>
  );
};

export default TestErrors;
