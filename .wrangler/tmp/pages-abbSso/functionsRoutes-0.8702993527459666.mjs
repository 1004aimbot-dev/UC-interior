import { onRequest as __api_example_endpoint_ts_onRequest } from "D:\\안티그래비티\\UC-Interior\\functions\\api\\example-endpoint.ts"

export const routes = [
    {
      routePath: "/api/example-endpoint",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_example_endpoint_ts_onRequest],
    },
  ]