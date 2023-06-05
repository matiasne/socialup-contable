import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client";
import { getSessionServices } from "./auth/services/session.service";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  headers: {
    authorization: getSessionServices("token"),
    "Content-Type": "application/json",
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

reportWebVitals();
