import { Card, CardContent, Pagination, Typography } from "@mui/material";
import { Fragment, ReactElement, useState } from "react";
import useFetchData from "../hooks/useFetchData";

// 1- create an interface --done
// 2- Fetch data with a hook --done
// 3- Move it to a spe file. --done
// 3- Find a cart/list style by material UIEvent
// 4- Display it --done
// 5- Get the data correct --done
// 6- If Loading... --done
// 7- Jump to the tests

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

function getFoundedYear(date: string) {
  const newData = new Date(date);
  return newData.getFullYear();
}

export default function StartupList(): ReactElement {
  const { data, error, loading } = useFetchData();
  const [pageNumber, setPageNumber] = useState(1);

  if (loading) return <div>Loading...</div>;

  function handleChange(event: React.ChangeEvent<unknown>, value: number) {
    setPageNumber(value - 1);
  }

  // console.log(index);
  // 0 - 1
  // 2 - 3

  return (
    <Fragment>
      {data
        ?.slice(pageNumber * 2, pageNumber * 2 + 2)
        ?.map(
          ({
            name,
            dateFounded,
            employees,
            totalFunding,
            legalEntity,
            shortDescription,
            id,
          }: Startup) => (
            <Card key={id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  sx={{ marginBottom: 2 }}
                >
                  Founded: {getFoundedYear(dateFounded)} | {employees} Employees
                  |{totalFunding} $ | {legalEntity}
                </Typography>
                <Typography variant="body2" component="h2">
                  {shortDescription}
                </Typography>
              </CardContent>
            </Card>
          )
        )}

      <Pagination count={3} onChange={handleChange} />
    </Fragment>
  );
}
