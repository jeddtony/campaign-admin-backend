import axios, {AxiosInstance} from "axios";
import { getToken } from "../helpers/localStorage";

// const apiUrl: string = "https://test.ecofitnesshub.com/api";
const apiUrl: string = "http://localhost:8000/api";
// const apiUrl: string = "https://b47b-102-89-47-186.ngrok-free.app/api";

let token = getToken();
const headers: {
    Accept: string;
    "Content-Type": string;
    Authorization: string;
  } = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    // "Content-Type": "application/json",
    Authorization: "Bearer " + getToken()
  };

const loginHeaders: {
    Accept: string;
    "Content-Type": string;
  } = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };

const instance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 50000,
    headers,
  });

  const loginInstance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 50000,
    headers: loginHeaders,
  });

  export async function login(data: any): Promise<any> {
    const result = await loginInstance.post("/login", data);
    // console.log(result);
    return result.data;
    // return processResult(result);
  }

  export async function postReport(data: any): Promise<any> {
    const result = await instance.post("/report/add-report", data);
    return result.data;
  }

  export async function postCongregation(data: any): Promise<any> {
    const result = await instance.post("/admin/add-congregations", data);
    return result.data;
  }

  export async function postPublisher(data: any): Promise<any> {
    const result = await instance.post("/admin/add-publisher", data);
    return result.data;
  }

  export async function getStudents(): Promise<any> {
    const result = await instance.get("/report/view-student");
    return result.data.data;
  }

  export async function getOneStudent(id:string): Promise<any> {
    const result = await instance.get("/report/view-student/" + id);
    return result.data.data;
  }

  export async function getDashboard(): Promise<any> {
    const result = await instance.get("/report/view-dashboard");
    return result.data.data;
  }

  export async function getCongregations(): Promise<any> {
    const result = await instance.get("/admin/congregations");
    return result.data;
  }

  export async function getPublishers(id?: {id: null}): Promise<any> {
    let url = id? "/admin/all-publishers?congregation_id=" + id : "/admin/all-publishers"
    const result = await instance.get(url);
    return result.data;
  }

  export async function getCongregationList(): Promise<any> {
    const result = await instance.get("/api/congregations");
    return result.data;
  }

  export async function getExperiences(): Promise<any> {
    const result = await instance.get("/report/view-experiences");
    return result.data;
  }

  export async function getPublisherDetail(id: string): Promise<any> {
    const result = await instance.get("/user-report/"+ id);
    return result.data;
  }

  export async function getProfile(): Promise<any> {
    const result = await instance.get("/me");
    return result.data.data;
  }