import { gql } from "@apollo/client";

export const FIND_USER = gql`
  query Query {
    findUser {
      id
      biography
      created_at
      date_of_birth
      first_name
      email
      is_admin
      last_name
      phone_number
      vehicles {
        id
        model
      }
    }
  }
`;