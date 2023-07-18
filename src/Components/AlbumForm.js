import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "@firebase/firestore";

function AlbumForm() {
  const [albumName, setAlbumName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const albumsRef = collection(db, "albums");
      await addDoc(albumsRef, {
        name: albumName,
      });
      setAlbumName("");
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };

  const handleChange = (e) => {
    setAlbumName(e.target.value);
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-2 mx-auto">
        <div className="flex flex-col text-center w-full mb-5">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Create an Album
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    AlbumName
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Album name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={albumName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="p-2 w-full flex">
                <button className="flex mx-auto text-white bg-[#ff1300] font-bold border-0 py-2 px-8 focus:outline-none hover:bg-red-600 bg rounded text-lg">
                  Clear
                </button>
                <button
                  className="flex mx-auto text-white bg-indigo-500 font-bold  border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AlbumForm;
