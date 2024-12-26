import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Adminsidebar from './Adminsidebar';
import Updategallery from './Updategallery';

const Admingallery = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:3000/images');
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!images) {
            setError('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('image', images);  // Use 'image' as the key for the file field
        formData.append('description', description);  // Append the description field

        try {
            await axios.post('http://localhost:3000/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Image uploaded successfully');
            // Reset form fields

        } catch (error) {
            alert('Failed to upload image');
        }
        window.location.assign('/admingallery')

    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/images/${id}`);
            alert('Image deleted successfully');
            fetchImages();
        } catch (error) {
            console.error('Error deleting image', error);
            alert('Failed to delete image');
        }
    };

    const handleImageSelect = (image) => {
        setSelectedImage(image);
        setDescription(image.description);
    };

    return (
        <div className="flex  bg-gray-200">
          
           <Adminsidebar />
          
            <div className="bg-white w-full">
                <div className="flex flex-col flex-1">
                    <div className="p-4 bg-blue-900 text-white ">
                        <h2 className="text-lg font-semibold">Manage Gallery</h2>
                    </div>
                </div>
                <div className="mx-auto p-4 bg-white ">
                    <h2 className="text-3xl font-bold mb-4 ">Upload New Image</h2>
                    <form onSubmit={handleSubmit} className="max-w-md">
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Image:
                            </label>
                            <input type="file" id="image" onChange={(e) => setImages(e.target.files[0])} className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description:
                            </label>
                            <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                        </div>
                        <button type="submit" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Upload Image
                        </button>
                    </form>
                </div>
                <div className="mx-auto p-4 bg-white ">
                <h2 className="text-3xl font-bold mb-4 ">Delete Image</h2>

                <Updategallery />
                </div>
            </div>
        </div>
    );
};

export default Admingallery;
