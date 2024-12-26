
import React,{ useState, useEffect } from 'react';
import axios from 'axios';

function Updategallery() {
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
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 ml-8">
                {images.map((a) => (
                    <div key={a._id} className="relative overflow-hidden">
                        <img
                            src={`http://localhost:3000/images/download/${a.path}`}
                            alt={a.description}
                            className="w-full h-48 object-cover"
                            onClick={() => handleImageSelect(a)}
                        />
                        <div className="overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300">
                            <button onClick={() => handleDelete(a._id)} className="text-white px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Updategallery
