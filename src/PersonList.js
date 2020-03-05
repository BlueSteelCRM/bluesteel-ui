import React from 'react';

import {useQuery} from 'urql';

const PersonList = () => {
  const [result] = useQuery({
    query: `query {
			  allPeople{
			  given_name
			  family_name
			  email
			  }
		}`,
    requestPolicy: 'cache-only',
  });
  return <p>{JSON.stringify(result)}</p>;
};

export default PersonList;
