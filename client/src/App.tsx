import { useState } from 'react';
import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from '@apollo/client';
import './App.css';
import { useBooksQuery } from './graphql';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

function App(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Fun />
      </ApolloProvider>
    </div>
  );
}

export default App;

gql`
  query Books {
    books {
      title
      author
    }
  }
`;

export function Fun(): JSX.Element {
  // const { data, loading, error } = use();
  const { loading, data, error } = useBooksQuery();

  if (error) {
    return <p>ah</p>;
  }
  if (loading) {
    return <p>zzz</p>;
  }
  // return <div>{JSON.stringify(data, null, 2)}</div>;
  return (
    <div>
      {data?.books.map((b) => (
        <p key={b.title}>{b.title}</p>
      ))}
    </div>
  );
}
