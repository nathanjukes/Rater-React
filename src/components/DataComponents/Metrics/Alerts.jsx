import React from "react";

const Alerts = () => {
  const buttonStyle =
    "shadow-lg shadow-gray-400 p-3 pb-1 text-center rounded-xl flex flex-col border-2 border-gray-200";
  return (
    <div className="m-4 mt-2 pt-4">
      <h1 class="text-3xl font-light leading-9 tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 flex-auto">
        Alerts
      </h1>
      <div className="grid grid-cols-4 gap-4 p-4 mx-4 mt-4">
        <div className={` ${buttonStyle} col-span-2 bg-white`}>
          <h2 className="text-left p-4 pt-4 pb-3 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            User Denial Alerts{" "}
            <span className="text-2xl">
              - 100+ denied requests p/m{" "}
              <span className="font-bold text-xl hover:cursor-pointer">
                (Configure Here)
              </span>
            </span>
          </h2>
          <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2 my-2 mt-1">
            <table class="table-auto w-full text-sm rtl:text-right">
              <thead>
                <tr class="bg-sideBarPurple text-gray-300 text-lg">
                  <th class="px-6 py-3 font-normal tracking-wider">User Id</th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    No. of Denied Requests
                  </th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    Timeframe
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={1}
                  class={`${
                    1 % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b text-center text-base`}
                >
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">124</td>
                  <td class="px-6 py-4">10th Jan 15:33 - 15:43</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={` ${buttonStyle} col-span-2 bg-white`}>
          <h2 className="text-left p-4 pt-4 pb-3 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            User Surge Alerts{" "}
            <span className="text-2xl">
              - 125+ requests p/m{" "}
              <span className="font-bold text-xl hover:cursor-pointer">
                (Configure Here)
              </span>
            </span>
          </h2>
          <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2 my-2 mt-1">
            <table class="table-auto w-full text-sm rtl:text-right">
              <thead>
                <tr class="bg-sideBarPurple text-gray-300 text-lg">
                  <th class="px-6 py-3 font-normal tracking-wider">User Id</th>
                  <th class="px-6 py-3 font-normal tracking-wider">API</th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    No. of Denied Requests
                  </th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    Timeframe
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={1}
                  class={`${
                    1 % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b text-center text-base`}
                >
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">124</td>
                  <td class="px-6 py-4">10th Jan 15:33 - 15:43</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={` ${buttonStyle} col-span-2 bg-white`}>
          <h2 className="text-left p-4 pt-4 pb-3 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            API Denial Alerts{" "}
            <span className="text-2xl">
              - 125+ requests p/m{" "}
              <span className="font-bold text-xl hover:cursor-pointer">
                (Configure Here)
              </span>
            </span>
          </h2>
          <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2 my-2 mt-1">
            <table class="table-auto w-full text-sm rtl:text-right">
              <thead>
                <tr class="bg-sideBarPurple text-gray-300 text-lg">
                  <th class="px-6 py-3 font-normal tracking-wider">User Id</th>
                  <th class="px-6 py-3 font-normal tracking-wider">API</th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    No. of Denied Requests
                  </th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    Timeframe
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={1}
                  class={`${
                    1 % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b text-center text-base`}
                >
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">124</td>
                  <td class="px-6 py-4">10th Jan 15:33 - 15:43</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={` ${buttonStyle} col-span-2 bg-white`}>
          <h2 className="text-left p-4 pt-4 pb-3 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            API Surge Alerts{" "}
            <span className="text-2xl">
              - 125+ requests per minute{" "}
              <span className="font-bold text-xl hover:cursor-pointer">
                (Configure Here)
              </span>
            </span>
          </h2>
          <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2 my-2 mt-1">
            <table class="table-auto w-full text-sm rtl:text-right">
              <thead>
                <tr class="bg-sideBarPurple text-gray-300 text-lg">
                  <th class="px-6 py-3 font-normal tracking-wider">User Id</th>
                  <th class="px-6 py-3 font-normal tracking-wider">API</th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    No. of Denied Requests
                  </th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    Timeframe
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={1}
                  class={`${
                    1 % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b text-center text-base`}
                >
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">124</td>
                  <td class="px-6 py-4">10th Jan 15:33 - 15:43</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
        <button
          className={` ${buttonStyle} col-span-1 bg-sideBarPurple text-center items-center text-3xl p-10 pb-10 text-gray-100 font-medium tracking-wider border-0 hover:shadow-xl hover:shadow-gray-400 hover:underline`}
        >
          Setup Denial Alert
        </button>
        <button
          className={` ${buttonStyle} col-span-1 bg-sideBarPurple text-center items-center text-3xl p-10 pb-10 text-gray-100 font-medium tracking-wider border-0 hover:shadow-xl hover:shadow-gray-400 hover:underline`}
        >
          Block / Limit User
        </button>{" "}
        <button
          className={` ${buttonStyle} col-span-1 bg-sideBarPurple text-center items-center text-3xl p-10 pb-10 text-gray-100 font-medium tracking-wider border-0 hover:shadow-xl hover:shadow-gray-400 hover:underline`}
        >
          Setup Surge Alert
        </button>{" "}
        <button
          className={` ${buttonStyle} col-span-1 bg-sideBarPurple text-center items-center text-3xl p-10 pb-10 text-gray-100 font-medium tracking-wider border-0 hover:shadow-xl hover:shadow-gray-400 hover:underline`}
        >
          Limit API
        </button>
        <div className={` ${buttonStyle} col-span-4 bg-white`}>
          <h2 className="text-left p-4 pt-4 pb-3 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            User Request Tracking{" "}
            <span className="text-2xl">- Monitoring specified users</span>
          </h2>
          <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2 my-2 mt-1">
            <table class="table-auto w-full text-sm rtl:text-right">
              <thead>
                <tr class="bg-sideBarPurple text-gray-300 text-lg">
                  <th class="px-6 py-3 font-normal tracking-wider">User Id</th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    No. of Accepted Requests
                  </th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    No. of Denied Requests
                  </th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    Request Count
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={1}
                  class={`${
                    1 % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b text-center text-base`}
                >
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">124</td>
                  <td class="px-6 py-4">215</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="w-1/3 ml-auto mr-auto m-4 p-4 flex items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:shadow-lg text-white font-semibold rounded-md transition-colors duration-100">
            <p className="text-gray-300 font-normal tracking-wider text-xl">
              Add User id
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
