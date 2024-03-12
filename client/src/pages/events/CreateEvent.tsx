import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { postEventData } from "../../apiRequests/getEvent";
import { useTranslation } from "react-i18next";

interface Inputs {
  eventName: string;
  venue: string;
  description: string;
  date: string;
}

const CreateEventModal: React.FC = () => {
  const {t} = useTranslation()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
  const [showModal, setShowModal] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      postEventData(data);
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
                  <label htmlFor="eventName" className="block text-gray-700 font-bold mb-2">Event Name:</label>
                  <input type="text" id="eventName" {...register("eventName", { required: true })} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  {errors.eventName && <span className="text-red-500">Event Name is required</span>}
                </div>

                <div className="mb-4">
                  <label htmlFor="venue" className="block text-gray-700 font-bold mb-2">Venue:</label>
                  <input type="text" id="venue" {...register("venue", { required: true })} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  {errors.venue && <span className="text-red-500">Venue is required</span>}
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                  <textarea id="description" {...register("description", { required: true })} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                  {errors.description && <span className="text-red-500">Description is required</span>}
                </div>

                <div className="mb-4">
                  <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date:</label>
                  <input type="date" id="date" {...register("date", { required: true })} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  {errors.date && <span className="text-red-500">Date is required</span>}
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
