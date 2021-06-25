import axios from "axios";
import {apiDomain} from "../../apiPath"

const Axios = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: `${apiDomain}`,
});

export default Axios;
