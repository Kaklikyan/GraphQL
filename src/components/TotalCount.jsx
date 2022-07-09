import { useQuery } from "@chakra-ui/react";
import { ALL_USERS } from "../apollo/users";

const TotalCount = ({ data }) => {

  return (
    <div >
      {data?.users && (
        <b>Total users: {data.users?.length}</b>
      )}
    </div>
  )
}

export default TotalCount;