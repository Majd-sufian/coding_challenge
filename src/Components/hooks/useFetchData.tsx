import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

export interface Startup {
  currentInvestmentStage: string;
  dateFounded: string;
  employees: string;
  id: number;
  legalEntity: string;
  name: string;
  shortDescription: string;
  technologyReadiness: string;
  totalFunding: number;
  usps: Array<any>;
}

const url = "http://localhost:8000/api/startups";

export default function useFetchData() {
  const [data, setData] = useState<Startup[]>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const cancelToken = axios.CancelToken.source();

    (async () => {
      try {
        const call = await axios
          .get<Startup>(url, { cancelToken: cancelToken.token })
          .then((response: AxiosResponse) => {
            setData(response.data);
            setLoading(false);
          });
      } catch (error: any) {
        setLoading(false);
        if (axios.isCancel(error)) {
          console.log("request paused");
        } else {
          setError(error);
        }
      }
    })();

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return { data, error, loading };
}
