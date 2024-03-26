import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Authenticator(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const excludedURLs = ["/", "/signup"];
  const isExcluded = excludedURLs.includes(location.pathname);

  //previousLocalStorage
  const access_token = localStorage.getItem("login");

  if (access_token) {
    if (!isExcluded) {
      return props.children;
    } else {
      navigate("/home");
    }
  } else {
    return props.children;
  }
}
