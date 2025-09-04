import './share.scss';
import Map from '../../assets/map.png';
import Friend from '../../assets/friend.png';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useState } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useRef } from 'react';
import { showToast } from '../../utils/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../utils/axiosConfig';
const initialData = {
  description: '',
  img: null,
};
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Share = () => {
  const queryClient = useQueryClient()
  const { currentUser } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [postData, setPostData] = useState(initialData);
  const mutation = useMutation({
    mutationFn: (formData) => {
      return axiosInstance.post('/posts/add-post', formData);
    },
    onSuccess: async() => {
      showToast('Post added successfully 🎉', 'success');
      setPostData(initialData);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to add post ❌', 'error');
    },
  });
  const validate = () => {
    const { description, img } = postData;

    if (!description?.trim() && !img) {
      showToast('Please provide a description or an image.', 'error');
      return false;
    }

    return true;
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostData((prev) => ({
        ...prev,
        img: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  try {
    const formData = new FormData();
    formData.append('description', postData.description);
    if (postData.img) {
      formData.append('img', postData.img);
    }
    mutation.mutate(formData);
  }
    catch (error) {
      console.error('Error submitting post:', error);
      showToast('Failed to submit post. Please try again.', 'error');
    }
  }
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={`${BASE_URL}${currentUser.user.profilePic}`} alt="" />
          <input type="text" placeholder={`What's on your mind ${currentUser.user.name}?`} name="description" value={postData.description} onChange={(e) => setPostData({ ...setPostData, description: e.target.value })} />
        </div>
        {preview && (
          <div className="preview">
            <img src={preview} alt="Profile Preview" />
            <button
              onClick={() => {
                setPreview(null);
                setPostData((prev) => ({
                  ...prev,
                  img: null,
                }));
                if (fileInputRef.current) {
                  fileInputRef.current.value = null;
                }
              }}
              className="btn-remove-overlay"
            >
              <RemoveCircleOutlineIcon />
            </button>
          </div>
        )}
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
            <label htmlFor="file">
              <div className="item">
                <AddPhotoAlternateIcon />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <AddLocationAltIcon />
              <span>Add Place</span>
            </div>
            <div className="item">
              <Diversity3Icon />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleSubmit} >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
