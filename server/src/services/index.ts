export interface ReviewModel {
  id: string;
  userID: string;
  rating: number;
  comment?: string;
}

const reviews: ReviewModel[] = [
  {
    id: '1',
    rating: 3,
    userID: '2',
  },
  {
    id: '2',
    rating: 1,
    userID: '1',
    comment: 'great stuff!',
  },
];

export type UserModel = AuthorModel | ReaderModel;

export interface ReaderModel {
  id: string;
  name: string;
  dob?: string;
  about?: string;
  reviewIDs: string[];
}

const readers: ReaderModel[] = [
  {
    id: '1',
    name: 'Top bloke 99',
    reviewIDs: ['1', '2'],
    about: 'judge, jury, executable',
  },
];

interface UserService {
  getReviews(): ReviewModel[];

  getReader(userID: string): ReaderModel | undefined;

  getUser(userID: string): UserModel | undefined;
}

export function usersService(): UserService {
  const serv: UserService = {
    getReader(userID: string) {
      return readers.find((u) => u.id === userID);
    },
    getReviews() {
      console.log('really heavy reviews request!');
      return reviews;
    },
    getUser(userId: string) {
      const user = this.getReader(userId);
      if (user) {
        return user;
      }
      return publishers.getAuthor(userId);
    },
  };

  return fixThis(serv);
}

// not saying this is a good thing, but fun to play with
function fixThis<A extends object>(obj: A): A {
  const keys = Object.keys(obj) as (keyof A)[];
  keys.forEach((key) => {
    if (typeof obj[key] === 'function') {
      // @ts-expect-error bind complaining here despite that we just checked it's a function
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,no-param-reassign
      obj[key] = obj[key].bind(obj);
    }
  });

  return obj;
}
// usersService.getUser = usersService.getUser.bind(usersService);

export interface BookModel {
  id: string;
  title: string;
  meta: {
    authorID: string;
    published: string;
  };
  blurb?: string;
  reviewIDs: string[];
}

interface LibraryService {
  getBook(id: string): BookModel | undefined;
  getBooks(): BookModel[];
}

const books: BookModel[] = [
  {
    id: '123',
    title: 'The Awakening',
    meta: {
      authorID: '2',
      published: 'wef',
    },
    blurb: 'top stuff',
    reviewIDs: [],
  },
  {
    id: '233',
    title: 'City of Glass',
    meta: {
      authorID: '1',
      published: 'today',
    },
    reviewIDs: ['1', '2'],
  },
];

const library: LibraryService = {
  getBook(id) {
    return books.find((b) => b.id === id);
  },
  getBooks() {
    console.log('getting books');
    return books;
  },
};

export interface AuthorModel {
  id: string;
  name: string;
  dob?: string;
  about?: string;
  reviewIDs: string[];
  bookIDs: string[];
}

interface PublishersService {
  getAuthor(id: string): AuthorModel | undefined;

  getAuthors(): AuthorModel[];
}

const authors: AuthorModel[] = [
  {
    id: '1',
    name: 'Paul Auster',
    reviewIDs: [],
    bookIDs: ['233'],
  },
  {
    id: '2',
    name: 'Kate Chopin',
    reviewIDs: [],
    bookIDs: ['123'],
  },
];
const publishers: PublishersService = {
  getAuthor(id) {
    return authors.find((a) => a.id === id);
  },
  getAuthors() {
    return authors;
  },
};

export interface Services {
  library: LibraryService;
  publishers: PublishersService;
  users: UserService;
}

export const servicesFactory = (): Services =>
  memoiser({
    library,
    publishers,
    users: usersService(),
  });

function memoiser(services: Services): Services {
  // @ts-expect-error Object.entries doesn't preserve types
  return Object.fromEntries(
    Object.entries(services).map(([serviceName, serviceDict]) => [
      serviceName,
      // @ts-expect-error Object.entries doesn't preserve types
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      Object.fromEntries(Object.entries(serviceDict).map(([name, fn]) => [name, memoise(fn)])),
    ])
  );
}

export function memoise<B>(fn: () => B): () => B;
export function memoise<A, B>(fn: (arg: A) => B): (arg: A) => B;
export function memoise<A, B, C>(fn: (a: A, b: A) => B): (a: A, b: B) => B;
export function memoise<A, B>(fn: (...args: A[]) => B): (...args: A[]) => B {
  const cache = new Map<string, B>();
  return (...arg) => {
    const key = JSON.stringify(arg);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (cache.has(key)) return cache.get(key)!;
    const res = fn(...arg);
    cache.set(key, res);
    return res;
  };
}
