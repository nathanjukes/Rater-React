import React, { useState } from "react";

const Footer = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalData, setInfoModalData] = useState(null);

  const openInfoModal = (val) => {
    setInfoModalData(val);
    setShowInfoModal(true);
  };

  const closeInfoModal = () => {
    setInfoModalData(null);
    setShowInfoModal(false);
  };

  const commonClasses = "mb-0 mt-4 font-bold";

  // Footer (Edited) from: https://flowbite.com/docs/components/footer/
  return (
    <footer className="bg-white md:flex md:items-center md:justify-between shadow rounded-lg p-4 md:p-6 xl:p-5 my-4 mx-4">
      <ul className="flex items-center flex-wrap mb-6 md:mb-0">
        <li>
          <a
            href="#"
            className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
            onClick={() => openInfoModal("terms")}
          >
            Terms and conditions
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
            onClick={() => openInfoModal("privacy")}
          >
            Privacy Policy
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-sm font-normal text-gray-500 hover:underline mr-4 md:mr-6"
            onClick={() => openInfoModal("cookies")}
          >
            Cookies
          </a>
        </li>
        <li>
          <a
            href="https://github.com/nathanjukes"
            className="text-sm font-normal text-gray-500 hover:underline"
          >
            Contact
          </a>
        </li>
      </ul>
      <div className="flex sm:justify-center space-x-6">
        <a
          href="https://github.com/nathanjukes"
          className="text-gray-500 hover:text-gray-900"
        >
          <svg
            className="h-8 w-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
      {showInfoModal && (
        <div className="fixed inset-0 flex items-center text-left justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-4xl font-semibold mb-4 text-center">
              {(() => {
                switch (infoModalData) {
                  case "terms":
                    return <h2>Terms & Conditions</h2>;
                  case "privacy":
                    return <h2 className="mx-24">Privacy</h2>;
                  case "cookies":
                    return <h2 className="mx-24">Cookies</h2>;
                  default:
                    return "";
                }
              })()}
            </h2>
            <div className="mb-4">
              {(() => {
                switch (infoModalData) {
                  case "terms":
                    return (
                      <div>
                        <h2 className={`${commonClasses}`}>
                          1. Acceptance of Terms
                        </h2>
                        <p>
                          By accessing or using Rater.io (the "Service"), you
                          agree to comply with and be bound by these terms and
                          conditions (the "Terms"). <br />
                          If you do not agree with any part of these Terms, you
                          may not use the Service.
                        </p>

                        <h2 className={`${commonClasses}`}>
                          2. Service Description
                        </h2>
                        <p>
                          The Rater.io app provides rate limiting services to
                          control and manage the rate of requests to your
                          applications, websites, or services.
                        </p>

                        <h2 className={`${commonClasses}`}>
                          3. Registration and User Accounts
                        </h2>
                        <ol>
                          <li>
                            To use the Service, you must register and create an
                            account. You agree to provide accurate, current, and
                            complete information during the registration
                            process.
                          </li>
                          <li>
                            You are responsible for maintaining the
                            confidentiality of your account credentials and for
                            all activities that occur under your account.
                          </li>
                        </ol>

                        <h2 className={`${commonClasses}`}>
                          4. Usage Policies
                        </h2>
                        <ol>
                          <li>
                            You agree to use the Service in compliance with all
                            applicable laws and regulations.
                          </li>
                          <li>
                            You may not use the Service to engage in any
                            unlawful or prohibited activities, including but not
                            limited to hacking, spreading malware, or any
                            activity that may disrupt the Service.
                          </li>
                        </ol>

                        <h2 className={`${commonClasses}`}>
                          5. Rate Limiting Parameters
                        </h2>
                        <ol>
                          <li>
                            The Service allows you to set and customise rate
                            limiting parameters. You are responsible for
                            configuring these parameters appropriately for your
                            use case.
                          </li>
                          <li>
                            We reserve the right to adjust or modify rate
                            limiting parameters to ensure the overall stability
                            and performance of the Service.
                          </li>
                        </ol>

                        <h2 className={`${commonClasses}`}>
                          6. Fees and Payments
                        </h2>
                        <ol>
                          <li>
                            The use of certain features of the Service may
                            require payment of fees. You agree to pay all fees
                            associated with your use of the Service.
                          </li>
                          <li>
                            Fees are subject to change, and any changes will be
                            communicated to you in advance.
                          </li>
                        </ol>

                        <h2 className={`${commonClasses}`}>
                          7. Intellectual Property
                        </h2>
                        <ol>
                          <li>
                            All content, software, and technology used in
                            connection with the Service are the property of the
                            Service provider and are protected by intellectual
                            property laws.
                          </li>
                          <li>
                            You may not copy, modify, distribute, or reverse
                            engineer any part of the Service.
                          </li>
                        </ol>

                        <h2 className={`${commonClasses}`}>
                          8. Limitation of Liability
                        </h2>
                        <ol>
                          <li>
                            The Service provider shall not be liable for any
                            direct, indirect, incidental, special, or
                            consequential damages resulting from the use or
                            inability to use the Service.
                          </li>
                          <li>
                            In no event shall the total liability of the Service
                            provider exceed the amount paid by you for the
                            Service during the preceding twelve (12) months.
                          </li>
                        </ol>

                        <h2 className={`${commonClasses}`}>9. Termination</h2>
                        <ol>
                          <li>
                            Either party may terminate the Service at any time
                            for any reason.
                          </li>
                          <li>
                            Upon termination, your access to the Service will be
                            revoked, and any data associated with your account
                            may be deleted.
                          </li>
                        </ol>

                        <h2 className={`${commonClasses}`}>
                          10. Governing Law
                        </h2>
                        <p>
                          These Terms are governed by and construed in
                          accordance with the laws of the United Kingdom.
                        </p>

                        <h2 className={`${commonClasses}`}>
                          11. Changes to Terms
                        </h2>
                        <p>
                          We reserve the right to modify these Terms at any
                          time. Any changes will be effective immediately upon
                          posting the revised Terms on the Service. <br />
                          Your continued use of the Service constitutes
                          acceptance of the modified Terms.
                        </p>
                      </div>
                    );
                  case "privacy":
                    return (
                      <div>
                        <h2 className={`${commonClasses}`}>1. Introduction</h2>
                        <p>
                          Thank you for using Rater.io. This Privacy Policy
                          explains how we collect, use, disclose, and safeguard
                          your information when you use our app.
                        </p>

                        <h2 className={`${commonClasses}`}>
                          2. Information We Collect
                        </h2>
                        <p className="pl-8">
                          a. <strong>User Account Information:</strong> To use
                          Rater.io, you may be required to create an account. We
                          collect information such as your organisation's name,
                          <br /> email address, and password to set up and
                          manage your account.
                        </p>
                        <p className="pl-8">
                          b. <strong>Usage Information:</strong> We may collect
                          information about how you interact with our app,
                          including your IP address, device information, and
                          usage patterns.
                        </p>

                        <h2 className={`${commonClasses}`}>
                          3. How We Use Your Information
                        </h2>
                        <p className="pl-8">
                          a. <strong>Providing Rate Limiting Services:</strong>{" "}
                          We use your account information to authenticate and
                          authorize your access to our services.
                        </p>
                        <p className="pl-8">
                          b. <strong>Improving Our Services:</strong> We analyze
                          usage information to understand user behavior and
                          improve the performance and features of Rater.io.
                        </p>
                        <p className="pl-8">
                          c. <strong>Communication:</strong> We may use your
                          contact information to send you important updates,
                          newsletters, or other communications related to
                          Rater.io.
                        </p>

                        <h2 className={`${commonClasses}`}>
                          4. Data Sharing and Disclosure
                        </h2>
                        <p className="pl-8">
                          a. <strong>Third-Party Service Providers:</strong> We
                          may share your information with third-party service
                          providers who assist us in providing and improving
                          Rater.io. These providers are obligated <br />
                          to maintain the confidentiality and security of your
                          information.
                        </p>
                        <p className="pl-8">
                          b. <strong>Legal Compliance:</strong> We may disclose
                          your information as required by law or when we believe
                          such disclosure is necessary to protect our rights,
                          comply with a judicial proceeding, <br />
                          court order, or legal process.
                        </p>

                        <h2 className={`${commonClasses}`}>5. Security</h2>
                        <p>
                          We implement reasonable security measures to protect
                          your information. However, no method of transmission
                          over the internet or electronic storage is 100%
                          secure, and we cannot <br />
                          guarantee absolute security.
                        </p>

                        <h2 className={`${commonClasses}`}>6. Your Choices</h2>
                        <p>
                          You can control the information you provide to us and
                          manage your account settings. You may also choose not
                          to provide certain information, but this may limit
                          your ability to use specific
                          <br /> features of Rater.io.
                        </p>

                        <h2 className={`${commonClasses}`}>
                          7. Children's Privacy
                        </h2>
                        <p>
                          Rater.io is not intended for children under the age of
                          13. We do not knowingly collect or maintain
                          information from children.
                        </p>

                        <h2 className={`${commonClasses}`}>
                          8. Updates to this Privacy Policy
                        </h2>
                        <p>
                          We reserve the right to update this Privacy Policy
                          periodically. Any changes will be posted on this page,
                          and the effective date will be updated.
                        </p>

                        <h2 className={`${commonClasses}`}>
                          9. Contact Information
                        </h2>
                        <p>
                          If you have any questions or concerns about our
                          Privacy Policy, please contact us at
                          https://github.com/nathanjukes.
                        </p>
                      </div>
                    );
                  case "cookies":
                    return (
                      <div>
                        <h2 className={`${commonClasses}`}>1. Introduction</h2>
                        <p>
                          Welcome to Rater.io. This Cookie Policy is designed to
                          help you understand how we use cookies and similar
                          technologies to provide you with a secure and
                          efficient
                          <br /> Rate Limiting as a Service experience.
                        </p>

                        <h2 className={`${commonClasses}`}>
                          2. What are Cookies?
                        </h2>
                        <p>
                          Cookies are small text files that are stored on your
                          device when you visit a website or use an app. They
                          help the website or app recognize your device and
                          store information <br />
                          about your preferences or actions.
                        </p>

                        <h2 className={`${commonClasses}`}>
                          3. Why do we use Cookies?
                        </h2>
                        <p>
                          We use cookies to enhance your experience and provide
                          you with a more personalized service. In the context
                          of Rater.io, cookies are primarily used for:
                        </p>
                        <ul className="pl-8">
                          <li>
                            <strong>Security:</strong> To prevent unauthorized
                            access and protect against malicious activity.
                          </li>
                          <li>
                            <strong>Performance:</strong> To optimize the
                            performance of our rate limiting services and ensure
                            a seamless user experience.
                          </li>
                        </ul>

                        <h2 className={`${commonClasses}`}>
                          4. Types of Cookies We Use
                        </h2>
                        <p className="pl-8">
                          <strong>Essential Cookies:</strong> These cookies are
                          necessary for the proper functioning of Rater.io. They
                          enable you to navigate through the app and use its
                          features securely.
                        </p>

                        <h2 className={`${commonClasses}`}>
                          5. How to Manage Cookies
                        </h2>
                        <p>
                          You can control and manage cookies in your browser
                          settings. Please note that disabling certain cookies
                          may impact the functionality of Rater.io.
                        </p>

                        <h2 className={`${commonClasses}`}>6. Consent</h2>
                        <p>
                          By using Rater.io, you consent to the use of cookies
                          as described in this Cookie Policy. If you do not
                          agree to the use of cookies, please adjust your
                          browser <br /> settings or refrain from using our app.
                        </p>

                        <h2 className={`${commonClasses}`}>
                          7. Changes to this Cookie Policy
                        </h2>
                        <p>
                          We may update this Cookie Policy from time to time.
                          Any changes will be posted on this page with the
                          updated effective date.
                        </p>

                        <h2 className={`${commonClasses}`}>8. Contact Us</h2>
                        <p>
                          If you have any questions or concerns about our use of
                          cookies, please contact us at
                          https://github.com/nathanjukes.
                        </p>
                      </div>
                    );
                  default:
                    return "";
                }
              })()}
            </div>
            <div className="flex flex-col justify-center">
              {infoModalData === "privacy" && (
                <p className="mb-2 mt-4 text-center">
                  By using Rater.io, you agree to the terms outlined.
                </p>
              )}
              <button
                onClick={closeInfoModal}
                className="px-12 py-2 w-1/6 mx-auto bg-sideBarPurple rounded-md text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
