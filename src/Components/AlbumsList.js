import React, { useState, useEffect } from "react";
import AlbumForm from "./AlbumForm";
import ImagesList from "./ImagesList";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, deleteDoc, doc } from "@firebase/firestore";

function AlbumsList() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [state, setState] = useState(false);
  const [album, setAlbum] = useState(false);

  useEffect(() => {
    // Fetch albums from the database on mount
    // const fetchAlbums = async () => {
    //   try {
    //     const albumsRef = collection(db, "albums");
    //     const snapshot = await getDocs(albumsRef);
    //     const fetchedAlbums = snapshot.docs.map((doc) => {
    //       return{
    //       id: doc.id,
    //       ...doc.data(),
    //       }
    //     },);
    //     setAlbums(fetchedAlbums);
    //   } catch (error) {
    //     console.error("Error fetching albums:", error);
    //   }
    // };

    // fetchAlbums();

    const unsub = onSnapshot(collection(db, "albums"), (snapShot) => {
      const fetchedAlbums = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setAlbums(fetchedAlbums);
    });
  }, []);

  const handleAlbumSelect = (albumId) => {
    setSelectedAlbum(albumId);
    setAlbum(true);
  };

  const handleAlbumDelete = async (albumId) => {
    try {
      // Delete the album from the database
      await deleteDoc(doc(db, "albums", albumId));

      // Update the state to reflect the deletion
      setAlbums((prevAlbums) =>
        prevAlbums.filter((album) => album.id !== albumId)
      );
      setSelectedAlbum(null);
      setAlbum(false);
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  const handleState = () => {
    setState(true);
  };

  const handleCancel = () => {
    setState(false);
  };

  return (
    <div className="my-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <button onClick={handleAlbum}>clickAlbum</button> */}
        {album ? (
          ""
        ) : (
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-2">
            <div className="albumForm">
              <h2 className="text-2xl font-bold text-gray-900">Your Albums</h2>
              {state ? (
                ""
              ) : (
                <button
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={handleState}
                >
                  Add Album
                </button>
              )}
              {state ? (
                <button
                  className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              ) : (
                ""
              )}
            </div>

            {state ? <AlbumForm /> : ""}

            <div className="mt-2 lg:flex lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 sm:flex">
              {albums.map((album) => (
                <div key={album.id}>
                  <div
                    key={album.id}
                    onClick={() => handleAlbumSelect(album.id)}
                    className="group relative w-44 border-2 border-white"
                  >
                    <div className="block relative h-50 w-50 rounded overflow-hidden album">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1250/1250635.png"
                        alt={album.name}
                        // className="h-full w-full object-cover object-center"
                        className="object-cover object-center w-full h-full block cursor-pointer"
                      />
                    </div>
                    <h3 className="font-bold text-center w-full uppercase bg-gray-200 cursor-pointer hover:bg-blue-500 hover:text-white py-2">
                      <a href={album.href}>
                        <span className="absolute inset-0" />
                        {album.name}
                      </a>
                    </h3>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-3 border border-red-500 hover:border-transparent rounded"
                      onClick={() => handleAlbumDelete(album.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {album ? selectedAlbum && <ImagesList albumId={selectedAlbum} /> : ""}
    </div>
  );
}

export default AlbumsList;
