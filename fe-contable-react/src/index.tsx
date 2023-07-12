import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { getSessionServices } from "./auth/services/session.service";
import { ToastProvider } from "./shared/Components/toast/ToastProvider";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  headers: {
    authorization: getSessionServices("token"),
    "Content-Type": "application/json",
  },
});

// const errorLink = new ApolloLink((operation, forward) => {
//   forward(operation).subscribe({
//     next: (data: any) => {},
//     error: (err: any) => {
//       if (err.response.status === 401) {
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       }
//     },
//   });
//   console.log(operation);

//   return f
// });

const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </ApolloProvider>
);

reportWebVitals();
