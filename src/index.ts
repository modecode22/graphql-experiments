import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const typeDefs = `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

type Book {
  id: ID!
  title: String!   # the ! means that this field is required
  category: [String!]! 
}

type Review {
  id:ID!
  rating:Int!
  content: String! 
}

type Author {
  id:ID!
  name:String!
  verified: Boolean! 
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query {
  books: [Book]
  reviews:[Review]
  authors:[Author]
}
`;
// Book type
type Book = {
    id: string;
    title: string;
    category: string[];
  };
  
  // Review type
  type Review = {
    id: string;
    rating: number;
    content: string;
  };
  
  // Author type
  type Author = {
    id: string;
    name: string;
    verified: boolean;
  };
const db: { books: Book[]; reviews: Review[]; authors: Author[] } = {
  books: [
    {
      id: "1",
      title: "The Great Gatsby",
      category: ["Fiction", "Classic"],
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      category: ["Fiction", "Classic"],
    },
    {
      id: "3",
      title: "The Lean Startup",
      category: ["Business", "Entrepreneurship"],
    },
  ],
  reviews: [
    {
      id: "1",
      rating: 5,
      content: "One of the best books I have ever read!",
    },
    {
      id: "2",
      rating: 3,
      content: "It was an okay read, but didn't live up to the hype.",
    },
    {
      id: "3",
      rating: 4,
      content: "Insightful and practical advice for entrepreneurs.",
    },
  ],
  authors: [
    {
      id: "1",
      name: "F. Scott Fitzgerald",
      verified: true,
    },
    {
      id: "2",
      name: "Harper Lee",
      verified: true,
    },
    {
      id: "3",
      name: "Eric Ries",
      verified: false,
    },
  ],
};

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => db.books,
    reviews: () => db.reviews,
    authors: () => db.authors,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
