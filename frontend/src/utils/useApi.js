import { useState, useEffect } from "react";
import { queryApi } from "../utils/queryApi";
/**
* @param {String} endpoint relative endpoint
* @param {object} body request body
* @param {String} method method can be ["GET","POST","PUT", "DELETE"] | Default
GET
* @param {boolean} transformBody whether to transform the request body from JSON
to FormData | Default false
*/
export function useApi(
    endpoint,
    body = null,
    method = "GET",
    transformBody = false,
    token = null
) {
// Create state values
// result, error and the body we will send
const [result, setResult] = useState(null);
const [error, setError] = useState(null);
const [bodyUsed, setBodyUsed] = useState(body);
// query that will call the queryApi function, takes only a new body argument(optional)
async function query(newBody) {
    if (newBody) setBodyUsed(newBody);
// If the endpoint is empty return an empty value
    if (!endpoint) return;
    setError(false);
    setResult(null);
// Normal call to queryApi, deconstructed into result and error
    const [res, err] = await queryApi(
    endpoint,
    bodyUsed,
    method,
    transformBody,
    token
);
    setResult(res);
    setError(err);
}
// On hook init call the query once with initial arguments
useEffect(() => {
    query();
// eslint-disable-next-line
}, []);
// Deconstruct the hook into result, error and a function that can update the hook
return [result, error, query];
}