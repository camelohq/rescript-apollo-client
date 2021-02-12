(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{66:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return a})),t.d(n,"metadata",(function(){return l})),t.d(n,"rightToc",(function(){return c})),t.d(n,"default",(function(){return s}));var r=t(2),o=t(6),i=(t(0),t(74)),a={id:"client-configuration",title:"Create a Client",sidebar_label:"Create a Client"},l={unversionedId:"client-configuration",id:"client-configuration",isDocsHomePage:!1,title:"Create a Client",description:"Let's initialize an ApolloClient instance. You'll need to provide it the URL of a running GraphQL server, such as the Star Wars API.",source:"@site/docs/client-configuration.md",slug:"/client-configuration",permalink:"/rescript-apollo-client/docs/client-configuration",editUrl:"https://github.com/reasonml-community/rescript-apollo-client/edit/master/documentation/docs/client-configuration.md",version:"current",sidebar_label:"Create a Client",sidebar:"docs",previous:{title:"Installation",permalink:"/rescript-apollo-client/docs/installation"},next:{title:"Queries",permalink:"/rescript-apollo-client/docs/queries"}},c=[{value:"Advanced (Typical) Configuration",id:"advanced-typical-configuration",children:[]}],p={rightToc:c};function s(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Let's initialize an ApolloClient instance. You'll need to provide it the URL of a running GraphQL server, such as the ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"https://graphql.org/swapi-graphql"}),"Star Wars API"),"."),Object(i.b)("p",null,"First, we'll create a file ",Object(i.b)("inlineCode",{parentName:"p"},"Apollo.res")," to group all our Apollo stuff."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-reason",metastring:'title="Apollo.res"',title:'"Apollo.res"'}),'let client = {\n  open ApolloClient\n  make(\n    ~cache=Cache.InMemoryCache.make(),\n    // I would turn this off in production\n    ~connectToDevTools=true,\n    ~uri="https://graphql.org/swapi-graphql"\n    (),\n  )\n}\n')),Object(i.b)("p",null,"Now connect the client to React."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-reason"}),'module App = {\n  <ApolloClient.React.ApolloProvider client=Apollo.client>\n    <div>\n      <h2>My first Apollo app \ud83d\ude80</h2>\n    </div>\n  </ApolloClient.React.ApolloProvider>\n}\n\nReactDOMRe.renderToElementWithId(<App />, "root")\n')),Object(i.b)("p",null,"That's it! Our client is ready to start fetching data."),Object(i.b)("h3",{id:"advanced-typical-configuration"},"Advanced (Typical) Configuration"),Object(i.b)("p",null,"Often, you'll want to take advantage of realtime data (subcriptions) and auth, so we'll go a little more in depth here. Feel free to skip this section and return to it when you have a need."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-reason",metastring:'title="Apollo.res"',title:'"Apollo.res"'}),'let graphqlEndpoint = "graphql.org/swapi-graphql"\n\nlet headers = {"Authorization": "There are a bunch of ways to get a token in here"}\n\n// This is the basic http link\nlet httpLink = ApolloClient.Link.HttpLink.make(\n  ~uri=_ => "https://" ++ graphqlEndpoint,\n  // Auth headers\n  ~headers=Obj.magic(headers),\n  (),\n)\n\n// This is a link to handle websockets (used by subscriptions)\nlet wsLink = {\n  open ApolloClient.Link.WebSocketLink\n  make(\n    ~uri="ws://" ++ graphqlEndpoint,\n    ~options=ClientOptions.make(\n      // Auth headers\n      ~connectionParams=ConnectionParams(Obj.magic({"headers": headers})),\n      ~reconnect=true,\n      (),\n    ),\n    (),\n  )\n}\n\n// This is a splitter that intelligently routes requests through http or websocket depending on type\nlet terminatingLink = ApolloClient.Link.split(~test=({query}) => {\n  let definition = ApolloClient.Utilities.getOperationDefinition(query)\n  switch definition {\n  | Some({kind, operation}) => kind === "OperationDefinition" && operation === "subscription"\n  | None => false\n  }\n}, ~whenTrue=wsLink, ~whenFalse=httpLink)\n\nlet client = {\n  open ApolloClient\n  make(\n    ~cache=Cache.InMemoryCache.make(),\n    ~connectToDevTools=true,\n    ~defaultOptions=DefaultOptions.make(\n      ~mutate=DefaultMutateOptions.make(~awaitRefetchQueries=true, ~errorPolicy=All, ()),\n      ~query=DefaultQueryOptions.make(~fetchPolicy=NetworkOnly, ~errorPolicy=All, ()),\n      ~watchQuery=DefaultWatchQueryOptions.make(~fetchPolicy=NetworkOnly, ~errorPolicy=All, ()),\n      (),\n    ),\n    ~link=terminatingLink,\n    (),\n  )\n}\n')))}s.isMDXComponent=!0},74:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return f}));var r=t(0),o=t.n(r);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=o.a.createContext({}),s=function(e){var n=o.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},u=function(e){var n=s(e.components);return o.a.createElement(p.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},h=o.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(t),h=r,f=u["".concat(a,".").concat(h)]||u[h]||d[h]||i;return t?o.a.createElement(f,l(l({ref:n},p),{},{components:t})):o.a.createElement(f,l({ref:n},p))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,a=new Array(i);a[0]=h;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,a[1]=l;for(var p=2;p<i;p++)a[p]=t[p];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,t)}h.displayName="MDXCreateElement"}}]);