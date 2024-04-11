import React, {useState} from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import { postServiceData } from "../../apiRequests/getService";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

interface Inputs {
    name: string
    description: string
    contact: string
}

const CreateServiceModal: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const [showModal, setShowModal] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try{
            postServiceData(data)
            alert("Service created successfully");
            setShowModal(false)
            reset()
        }catch(error){
            alert("Failed to create service")
        }
    }

    return(
        <div>
            <button onClick={() => setShowModal(true)} className="bg-teal-400">
                {t("Create Service")}
            </button>
            {showModal && (
        <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <span className="close cursor-pointer absolute top-0 right-0 mt-4 mr-6 text-2xl" onClick={() => setShowModal(false)}>&times;</span>
              <h2 className="text-2xl font-semibold mb-6">Create Service</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Service Name:</label>
                  <input type="text" id="name" {...register("name", { required: true })} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  {errors.name && <span className="text-red-500">Service Name is required</span>}
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                  <textarea id="description" {...register("description", { required: true })} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                  {errors.description && <span className="text-red-500">Description is required</span>}
                </div>

                <div className="mb-4">
                  <label htmlFor="contact" className="block text-gray-700 font-bold mb-2">Contact:</label>
                  <input type="text" id="contact" {...register("contact", { required: true })} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                  {errors.contact && <span className="text-red-500">Contact is required</span>}
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
        </div>
    )
}

export default CreateServiceModal