import React, { useState } from 'react';
import axios from 'axios';

const Upload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'data_sekil');
    formData.append('cloud_name', 'djlix30nq'); 

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/djlix30nq/image/upload',
        formData 
      );

      setImage(response.data.url); 
      setError(null);
      console.log(response.data.url);
    } catch (error) {
      console.error('Image upload failed:', error);
      setError('Image upload failed. Please try again.');
    }
  };

  return (
    <div className='mb-4'>
      <input type="file" onChange={handleImageUpload} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {image && <p>{image}</p>}
    </div>
  );
};

export default Upload;
