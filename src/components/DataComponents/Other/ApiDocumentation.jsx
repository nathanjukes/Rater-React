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
              <span className="bg-sideBarPurple rounded-md px-2 py-0.5 mr-4 text-backgroundWhite">
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
              <span className="bg-sideBarPurple rounded-md px-2 py-0.5 mr-4 text-backgroundWhite">
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
              <span className="bg-sideBarPurple rounded-md px-2 py-0.5 mr-4 text-backgroundWhite">
                Step 3.
              </span>
            </h1>
            <h1 class="ml-16 mt-6 text-1xl font-light leading-9 mr-20 tracking-tight text-gray-900 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 flex-auto">
              For the relevant Service, send requests to:
              /rater-rate-control/api/v1/process
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentation;
