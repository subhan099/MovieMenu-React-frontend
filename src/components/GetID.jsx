// import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

const GetId = async () => {
  try {
    const token = localStorage.getItem("login")

    if (!token) {
      return null;
    }

    const decodedToken = jwtDecode(token);
    // console.log("token is as: ", decodedToken)
    const id = decodedToken.userId;
    // console.log("in getId: ", id)
    return id;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

export { GetId };