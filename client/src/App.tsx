import { ApolloClient, ApolloProvider, gql, InMemoryCache } from '@apollo/client';
import './App.css';
import { useBooksQuery } from './graphql';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    possibleTypes: {
      // need to describe unions and interfaces - which is annoying
      Member: ['Author', 'Reader'],
    },
  }),
});

function App(): JSX.Element {
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
  query Books($userId: ID!) {
    books {
      title
      author {
        name
      }
    }
    user(id: $userId) {
      ... on Member {
        name
        reviews {
          comment
        }
      }
    }
  }
`;

export function Fun(): JSX.Element {
  const { loading, data, error } = useBooksQuery({ variables: { userId: '1' } });

  if (error) {
    return <p>ah</p>;
  }

  if (loading) {
    return <p>zzz</p>;
  }

  return (
    <div>
      {data?.books.map((b) => (
        <p key={b.title}>{b.title}</p>
      ))}
      {data?.user?.name && <p>user is {data.user.name}</p>}
    </div>
  );
}
