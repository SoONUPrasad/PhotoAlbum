import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

function ImageForm({ albumId }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imagesRef = collection(db, "images");
      await addDoc(imagesRef, {
        albumId: albumId,
        title: title,
        url: url,
      });
      setTitle("");
      setUrl("");
    } catch (error) {
      console.error("Error creating image:", error);
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative shadow-lg p-5">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-5">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Add Images
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm font-bold text-gray-600"
                    >
                      Tittle
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Add Title"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm font-bold text-gray-600"
                    >
                      URL
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Add URL"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-full flex">
                  <button className="flex mx-auto text-white bg-[#ff1300] font-bold border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Clear
                  </button>
                  <button
                    className="flex mx-auto text-white bg-indigo-500 font-bold  border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ImageForm;
