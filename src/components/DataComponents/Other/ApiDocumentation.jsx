import React from "react";

const ApiDocumentation = () => {
  return (
    <div className="m-4 mt-2 pt-4">
      <h1 class="text-3xl font-light leading-9 tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 flex-auto">
        API Documentation & Usage
      </h1>
      <div className="grid-container mt-12 ml-4">
        <div className="grid-item">
          <div>
            <h1 class="text-2xl font-light leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 flex-auto">
              <span className="bg-sideBarPurple rounded-lg py-1 px-3 mr-4 text-backgroundWhite">
                Step 1.
              </span>
            </h1>
            <h1 class="ml-16 mt-6 text-1xl font-light leading-9 mr-20 tracking-tight text-gray-900 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 flex-auto">
              Configure your Applications, Services and APIs from the
              <span className="bg-sideBarPurple rounded-md px-1 mx-2 mr-0 text-backgroundWhite">
                Dashboard
              </span>
            </h1>
          </div>
        </div>
        <div className="grid-item mt-20">
          <div>
            <h1 class="text-2xl font-light leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 flex-auto">
              <span className="bg-sideBarPurple rounded-lg py-1 px-3 mr-4 text-backgroundWhite">
                Step 2.
              </span>
            </h1>
            <h1 class="ml-16 mt-6 text-1xl font-light leading-9 mr-20 tracking-tight text-gray-900 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 flex-auto">
              Head over to the
              <span className="bg-sideBarPurple rounded-md px-1 mx-2 text-backgroundWhite">
                Service
              </span>
              you want to configure, and click on the{" "}
              <span className="bg-sideBarPurple rounded-md px-1 mx-0 mr-2 text-backgroundWhite">
                API Key
              </span>
              button, copy this and keep it{" "}
              <span className="font-bold">Secure</span>, it is your key to
              access the Processing & Status APIs
            </h1>
          </div>
        </div>
        <div className="grid-item mt-20">
          <div>
            <h1 class="text-2xl font-light leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 flex-auto">
              <span className="bg-sideBarPurple rounded-lg py-1 px-3 mr-4 text-backgroundWhite">
                Step 3.
              </span>
            </h1>
            <h1 class="ml-16 mt-6 text-1xl font-light leading-9 mr-20 tracking-tight text-gray-900 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 flex-auto">
              Within the middleware of the service you wish to track, insert the
              following code along with your API Key for that service:
            </h1>
            <div className="grid grid-cols-2 mt-4 border-4 border-gray-800 rounded-xl p-4 m-4 py-6">
              <div className="col-span-1">
                <h1 className="text-black text-4xl w-fit mx-auto pb-2">
                  Endpoint:
                </h1>
                <h1 className="bg-zinc-900 text-3xl text-gray-100 py-8 font-mono bg-opacity-90 rounded-xl p-4 text-center justify-center my-auto w-fit mx-auto">
                  <span className="bg-blue-800 p-0.5 py-1 pl-2 pr-1 rounded-lg mr-2">
                    POST:
                  </span>
                  167.172.62.246:8080/rater-rate-control/api/v1/process
                </h1>
              </div>
              <div className="col-span-1">
                <h1 className="text-black text-4xl w-fit mx-auto pb-2">
                  Request Body:
                </h1>
                <h1 className="bg-zinc-900 text-3xl text-gray-100 font-mono bg-opacity-90 rounded-xl p-4 w-fit mx-auto whitespace-pre-wrap">
                  {`{
  `}
                  <span className="text-yellow-400">"apiKey"</span>
                  {`: `}
                  <span className="text-green-400">
                    "qCK9oDhQPwVdGUsz4hL8sHOfq1yDgxtGLYgT2f2NBWk=",
                  </span>
                  {`
  `}
                  <span className="text-yellow-400">"apiPath"</span>
                  {`: `}
                  <span className="text-green-400">
                    "GET:/users [Your API path here]",
                  </span>
                  {`
  `}
                  <span className="text-yellow-400">"data"</span>
                  {`: `}
                  <span className="text-green-400">"User Data (Ip/Id)"</span>
                  {`
}`}
                </h1>
              </div>
              <div className="col-span-1 mt-6">
                <h1 className="text-black text-4xl w-fit mx-auto pb-2">
                  Response Body:
                </h1>
                <h1 className="bg-zinc-900 text-3xl text-gray-100 font-mono bg-opacity-90 rounded-xl p-4 w-fit mx-auto whitespace-pre-wrap">
                  {`{
  `}
                  <span className="text-yellow-400">"apiName"</span>
                  {`: `}
                  <span className="text-green-400">"GET:/users",</span>
                  {`
  `}
                  <span className="text-yellow-400">"rateExceeded"</span>
                  {`: `}
                  <span className="text-green-400">"false",</span>
                  {`
  `}
                  <span className="text-yellow-400">"currentLoad"</span>
                  {`: `}
                  <span className="text-green-400">"23"</span>
                  {`
  `}
                  <span className="text-yellow-400">"limit"</span>
                  {`: `}
                  <span className="text-green-400">"41",</span>
                  {`
  `}
                  <span className="text-yellow-400">"timeStamp"</span>
                  {`: `}
                  <span className="text-green-400">
                    "2024-01-17T11:22:38.716634569",
                  </span>
                  {`
}`}
                </h1>
              </div>
              <div className="col-span-1 mt-6">
                <h1 className="text-black text-4xl w-fit mx-auto pb-2">
                  Python Implementation Example:
                </h1>
                <div className="bg-zinc-900 text-gray-100 text-2xl py-2 font-mono bg-opacity-90 rounded-xl p-4 text-center justify-center my-auto w-fit mx-auto">
                  <pre className="text-left">
                    <code>
                      {`import requests

# Specify the URL
url = "167.172.62.246:8080/rater-rate-control/api/v1/process"

# Create the JSON request body
request_body = {
    "apiKey": "qCK9oDhQPwVdGUsz4hL8sHOfq1yDgxtGLYgT2f2NBWk=",
    "apiPath": "GET:/users",
    "data": "151.136.214.41"
}

# Send the POST request
response = requests.post(url, json=request_body)

# Check the response code and content
if response.text == 'true':
  return HttpStatus.429
else:
  Process Request 

Check 'rateExceeded' here!`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentation;
