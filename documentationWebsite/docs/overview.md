---
id: overview
title: Overview
sidebar_label: Overview
slug: /
---

This library provides rescript bindings to `@apollo/client` and related libraries. We rely on the amazing [Graphql-ppx](https://graphql-ppx.com) for completely typesafe GraphQL operations and fragments in Rescript. This means that even when manipulating the cache directly, you'll always be working with rescript data structures and never have to concern yourself the javascript representation of your data!

We provide a few ergonomic improvements for working in ReScript, but our intention is not to provide another abstraction on top of Apollo. **The [official Apollo Client 3 docs](https://www.apollographql.com/docs/react/v3.0-beta/get-started/), should be your authoritative source for understanding how to work with Apollo Client.**

## Quick Start

In short, the only major difference from javascript Apollo Client you should be aware of, is the appropriate hook (`useQuery`, `useMutation`, etc.) is exposed as a `use` function on the module generated by `graphql-ppx`. Variables are always the last argument to a hook.

```reason
module TodosQuery = %graphql(`
  query Example ($userId: String!) {
    user(id: $userId) {
      id
      name
    }
  }
`)

@react.component
let make = () =>
  // The useQuery hook is automatically exposed on the module generated by graphql-ppx!
  switch ExampleQuery.use({userId: "1"}) {
    | {data: Some({users})} =>
    ...
  }
}
```

### Records, Types, and Promises

This library leverages records heavily which allows for very similar syntax to working with javascript objects and other benefits, but comes with a downside. You may need to annotate the types if you're using a record in a context where the compiler cannot infer what it is. To make this less of a hassle, we expose every type from the `ApolloClient.Types` module.

```reason
  let queryResult = SomeQuery.use()

  // Destructuring works just like javascript!
  switch queryResult {
    | {loading: true} =>
      // Show loading
    | {data: Some(data), fetchMore} =>
      let onClick = _ => fetchMore()
      // Show data
  }


  apolloClient.query(~query=(module SomeQuery), ())
  |> Js.Promise.then(result => // Hover over the type and you can see it is an ApolloQueryResult.t__ok
    // Let's open the module so the record fields are accessible
    open ApolloClient.Types.ApolloQueryResult
    // ☝️ You don't have to go searching for a type, everything is accessible under ApolloClient.Types
    switch result {
    | Some(apolloQueryResult) =>
      // Now we can get at the `data` property of `apolloQueryResult`
      Js.log2("Got data!", apolloQueryResult.data)
    | Error(_) =>
      Js.log("Check out EXAMPLES/ for T-first promise solutions that don't have this problem!")
    }
  )
```

### Use a T-First promise library

Type inference for records is very handy, so we highly recommend using a T-First promise library. A great choice is [rescript-promise](https://github.com/ryyppy/rescript-promise#common-mistakes) that will soon be part of core. This is what will be assumed in all examples.

## Module Organization

This library packages things up into logical groups that have a consistent structure with the intent to be more disoverable and less reliant on docs. For the most part, I hope you can navigate things well from typing `ApolloClient.` and following the autocompletion from there. Example:

```reason
// Make a generic link
let customLink = ApolloClient.Link.make(...)
// Specific link types are nested under the more general module
let contextLink = ApolloClient.Link.ContextLink.make(...)
// See, they're all the same :)
let httpLink = ApolloClient.Link.HttpLink.make(...)
```

While we strive to provide ergonomics that are intuitive and "reasonable", the intent is to also expose a 1:1 mapping to the javascript package structures if that is your preference. For instance, if you're looking in the Apollo docs and see `import { setContext } from '@apollo/link-context'` and you'd prefer to interact with this library in the same way, you can always access with the same filepath and name like so:

```reason
module Apollo = {
  include ApolloClient.Bindings
};

// import { setContext } from '@apollo/client/link/context'
let contextLink = Apollo.Client.Link.Context.setContext(...)
// import { createHttpLink } from '@apollo/client'
let httpLink = Apollo.Client.createHttpLink(...)
```

### Bindings to Javascript Packages

Contains partial bindings to the following packages:

- [@apollo/client](https://github.com/apollographql/apollo-client)
- [graphql](https://github.com/graphql/graphql-js)
- [subscriptions-transport-ws](https://github.com/apollographql/subscriptions-transport-ws)
- [zen-observable](https://github.com/zenparsing/zen-observable)

## Alternatives

There are many great options for working with GraphQL in Rescript. I recommend giving them a look to see what works best for you.

- [Reason Relay](https://github.com/zth/reason-relay)
- [Reason Urql](https://github.com/FormidableLabs/reason-urql)