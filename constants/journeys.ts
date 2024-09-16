import { gql } from "@apollo/client";

export const RESEARCH_JOURNEYS = gql`
query SearchJourneys(
		$nbPassengers: Float!
		$startDateTime: DateTime!
		$endCity: String!
		$startCity: String!
	) {
		searchJourneys(
			nbPassengers: $nbPassengers
			start_date_time: $startDateTime
			endCity: $endCity
			startCity: $startCity
		) {
			id
			start_point {
				city
			}
			end_point {
				city
			}
			car {
				owner {
					id
					first_name
					last_name
					photo
				}
			}
			is_instant_bookable
			seats_available
			start_date_time
			duration
		}
	}
`;

export const ADD_JOURNEY = gql`
  mutation CreateJourney($createJourneyInput: CreateJourneyInput!) {
    createJourney(createJourneyInput: $createJourneyInput) {
      start_date_time
      is_instant_bookable
      is_smoking_allowed
      is_talkative
      is_music_lover
      seats_available
      car {
        id
      }
      comment
      duration
      start_point {
        latitude
        longitude
        city
      }
      end_point {
        latitude
        longitude
        city
      }
    }
  }
`;

export const USER_JOURNEYS = gql`
	query FindUserBookings {
		findUserBookings {
			journey {
				id
				start_point {
					city
				}
				end_point {
					city
				}
				car {
					owner {
						id
						first_name
						last_name
					}
				}
				is_instant_bookable
				seats_available
				start_date_time
				duration
      }
    }
  }
`;
