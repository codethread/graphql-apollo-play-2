import { Component, useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from '@apollo/client';
import logo from './logo.svg';
import './App.css';

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

export function Fun(): JSX.Element {
  const { loading, data, error } = useQuery(gql`
    query ExampleQuery {
      books {
        author
        title
      }
    }
  `);

  if (error) {
    return <p>ah</p>;
  }
  if (loading) {
    return <p>zzz</p>;
  }
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
