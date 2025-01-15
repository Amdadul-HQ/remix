import {
  Form,
  json,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
// existing imports

import appStylesHref from "./app.css?url";
import { ContactRecord, getContacts } from "./data";
import { useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async ({request}:LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("searchTerm");
  const contacts = await getContacts(q);
  return json({contacts,q});
}


export default function App() {
  const { contacts,q } : {contacts: ContactRecord[];q:string} = useLoaderData();
  const navigation = useNavigation(); 
  const submit = useSubmit();

   const searching =
     navigation.location &&
     new URLSearchParams(navigation.location.search).has("searchTerm");

  useEffect(() => {
    const searchField = document.getElementById("searchTerm");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form
              onChange={(event) => submit(event.currentTarget)}
              id="search-form"
              role="search"
            >
              <input
                aria-label="Search contacts"
                id="searchTerm"
                className={searching ? "loading" : ""}
                name="searchTerm"
                defaultValue={q || ""}
                placeholder="Search"
                type="search"
              />
              <div aria-hidden hidden={!searching} id="search-spinner" />
            </Form>
            {/* <Form method="post"> */}
            <Link to="/contacts/create">
              <button type="button">New</button>
            </Link>
            {/* </Form> */}
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                      to={`contacts/${contact.id}`}
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite ? <span>★</span> : null}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        {/* Details */}
        <div
          className={navigation.state === "loading" ? "loading" : ""}
          id="detail"
        >
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
