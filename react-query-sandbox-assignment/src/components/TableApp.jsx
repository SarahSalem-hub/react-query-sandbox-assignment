import { Table } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
// import getContact from "./api"

export default function TableApp() {
  const query = useQuery({ queryKey: ["contact"], queryFn: getContact });
  const { data, isError, error, isSuccess,isRefetching,isFetching } = query;
//   console.log("error", error);
//   console.log("data", data);
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>PhoneNumber</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess &&
            data.map((data) => {
              return (
                <tr>
                  <th scope="row">{data.id}</th>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.phoneNumber}</td>
                </tr>
              );
            })}
          {isError && <p>Error</p>}
          {isRefetching && <p>refetching</p>}
          {isFetching && <p>fetching</p>}
        </tbody>
      </Table>
    </div>
  );
}

export async function getContact() {
  const response = await fetch("http://localhost:3000/contacts");
  const data = await response.json();
  return data;
}

//  <tr>
//             <th scope="row">2</th>
//             <td>Jacob</td>
//             <td>Thornton</td>
//             <td>+1 111111111</td>
//           </tr>
//           <tr>
//             <th scope="row">3</th>
//             <td>Larry</td>
//             <td>the Bird</td>
//             <td>+1 111111111</td>
//           </tr>
