import React, { useState, useEffect } from "react";
import ImageForm from "./ImageForm";
import Carousel from "./Carousel";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import AlbumsList from "./AlbumsList";

function ImagesList({ albumId }) {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [albumList, setAlbumList] = useState(false);
  const [state, setState] = useState(false);
  const [editImageId, setEditImageId] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // const fetchImages = async () => {
    //   try {
    //     const imagesRef = query(
    //       collection(db, "images"),
    //       where("albumId", "==", albumId)
    //     );
    //     const snapshot = await getDocs(imagesRef);
    //     const fetchedImages = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setImages(fetchedImages);
    //     setIsLoading(false); // Set loading state to false when images are fetched
    //   } catch (error) {
    //     console.error("Error fetching images:", error);
    //   }
    // };

    // fetchImages();

    const getImages = onSnapshot(
      query(collection(db, "images"), where("albumId", "==", albumId)),
      (snapshot) => {
        const fetchedImages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(fetchedImages);
        setIsLoading(false);
      }
    );
  }, [albumId]);

  const handleCancel = () => {
    setAlbumList(true);
  };

  const handleImageSelect = (imageId) => {
    setSelectedImage(imageId);
    setIsOpen(true);
  };

  const handleState = () => {
    setState(true);
  };

  const handleStateCancel = () => {
    setState(false);
    setEditImageId(null);
  };

  const handleImageDelete = async (imageId) => {
    try {
      await deleteDoc(doc(db, "images", imageId));
      setImages((prevImages) =>
        prevImages.filter((image) => image.id !== imageId)
      );
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleImageEdit = (imageId) => {
    setEditImageId(imageId);
    setState(true);
  };

  const handleCloseCarousel = () => {
    setSelectedImage(null);
    setIsOpen(false);
  };

  return (
    <div>
      {albumList ? (
        <AlbumsList />
      ) : (
        <div>
          <div className="bg-white px-52">
            <button
              className="bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white py-1 px-4 border border-yellow-500 hover:border-transparent rounded"
              onClick={handleCancel}
            >
              Back
            </button>
            <div className="albumForm">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Image Here
              </h2>
              {state ? (
                ""
              ) : (
                <button
                  className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={handleState}
                >
                  Add Image
                </button>
              )}
              {state ? (
                <button
                  className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  onClick={handleStateCancel}
                >
                  Cancel
                </button>
              ) : (
                ""
              )}
            </div>

            {state ? (
              <ImageForm albumId={albumId} editImageId={editImageId} />
            ) : (
              ""
            )}
            <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              {isLoading ? (
                <div className="text-center">Loading...</div> // Display loading state
              ) : (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {images.map((image) => (
                    <div key={image.id} className="">
                      <div
                        className="group cursor-pointer"
                        key={image.id}
                        href={image.href}
                        onClick={() => handleImageSelect(image.id)}
                      >
                        <div className="aspect-h-1 aspect-w-1 w-full rounded-l xl:aspect-h-8 xl:aspect-w-7">
                          <img
                            src={image.url}
                            alt={image.title}
                            className="h-full w-full object-cover object-center group-hover:opacity-75 shadow-2xl rounded-lg"
                          />
                          <h3 className="font-bold text-gray-700 uppercase">
                            {image.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded"
                          onClick={() => handleImageDelete(image.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-1 px-2 border border-green-500 hover:border-transparent rounded"
                          onClick={() => handleImageEdit(image.id)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                  {selectedImage != null && isOpen && (
                    <Carousel
                      images={images}
                      selectedImageId={selectedImage}
                      onClose={handleCloseCarousel}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagesList;
