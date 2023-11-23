import React, { useState } from "react";

const CreateComponent = ({ buttonText, onCreate }) => {
  const [showModal, setShowModal] = useState(false);
  const [newAppName, setNewAppName] = useState("");

  const createX = async () => {
    try {
      await onCreate(newAppName);
      closeModal();
    } catch (error) {
      console.error("Error creating X:", error);
    }
  };

  const handleAppNameChange = (event) => {
    setNewAppName(event.target.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewAppName("");
  };

  const handleCreateX = () => {
    createX();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="m-4 flex items-center justify-center bg-purple-400 border-2 border-gray-500 hover:border-gray-400 text-white font-semibold rounded-md transition-colors duration-100"
      >
        <p className="text-black text-xl">{buttonText}</p>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Create New X</h2>
            <div className="mb-4">
              <label htmlFor="xName" className="block font-semibold mb-2">
                X Name:
              </label>
              <input
                type="text"
                id="xName"
                value={newAppName}
                onChange={handleAppNameChange}
                className="border border-gray-400 p-2 rounded-md w-full"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 rounded-md text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateX}
                className="px-4 py-2 bg-purple-500 rounded-md text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateComponent;
