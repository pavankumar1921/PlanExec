import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { postEventData } from "../../apiRequests/getEvent";
import { useTranslation } from "react-i18next";

interface Inputs {
  aitext:string;
}

const CreateEventModal: React.FC = () => {
  const {t} = useTranslation()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
  const [showModal, setShowModal] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await postEventData({aitext:data.aitext});
      alert("Event created successfully!");
      setShowModal(false);
      reset();
    } catch (error) {
      alert("Failed to create event!");
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {t("Create Event")}
      </button>
      {showModal && (
        <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <span className="close cursor-pointer absolute top-0 right-0 mt-4 mr-6 text-2xl" onClick={() => setShowModal(false)}>&times;</span>
              <h2 className="text-2xl font-semibold mb-6">Create Event</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                <label
                htmlFor="aitext"
                style={{ marginBottom: "8px", color: "white" }}
              >
                Event details:
              </label>
              <p style={{ marginBottom: "8px", color: "white" }}>
                Mention  eventName, venue, description, date in the details{" "}
              </p>
              <textarea
                id="aitext"
                {...register("aitext", { required: true })}
                style={{ marginBottom: "8px", padding: "8px", height: "200px" }}
                required
              />
                  </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEventModal;
