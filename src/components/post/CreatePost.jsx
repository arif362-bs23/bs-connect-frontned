import React, {useEffect, useState} from 'react';
import { X, Image, Video, Smile, Globe, Users, Lock, Camera } from 'lucide-react';
import { useCreatePost } from '../../services/PostService';
import { useAuth } from '../../hooks/useAuth';

const CreatePost = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setContent] = useState('');
    const [privacy, setPrivacy] = useState('public');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [mediaPreview, setMediaPreview] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const { auth } = useAuth();
    const user = auth.user;
    const createPostMutation = useCreatePost();

    const privacyOptions = [
        { value: 'public', label: 'Public', icon: Globe, description: 'Anyone can see this post' },
        { value: 'followers', label: 'Followers', icon: Users, description: 'Only your followers can see this' },
        { value: 'only_me', label: 'Only me', icon: Lock, description: 'Only you can see this post' }
    ];

    const openModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'; // Disable scroll
        } else {
            document.body.style.overflow = 'auto'; // Re-enable scroll
        }

        // Clean up on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    const closeModal = () => {
        setIsModalOpen(false);
        setContent('');
        setPrivacy('public');
        setMediaFiles([]);
        setMediaPreview([]);
    };

    const handleFileSelect = (files) => {
        const fileArray = Array.from(files);
        const validFiles = fileArray.filter(file => {
            const isValid = file.type.startsWith('image/') || file.type.startsWith('video/');
            if (!isValid) {
                console.warn(`File ${file.name} is not a valid image or video file`);
            }
            return isValid;
        });

        if (validFiles.length > 0) {
            setMediaFiles(prev => [...prev, ...validFiles]);

            // Create previews
            validFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setMediaPreview(prev => [...prev, {
                        id: Date.now() + Math.random(),
                        file,
                        url: e.target.result,
                        type: file.type.startsWith('image/') ? 'image' : 'video'
                    }]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        if (files) {
            handleFileSelect(files);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files) {
            handleFileSelect(files);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const removeMedia = (indexToRemove) => {
        setMediaFiles(prev => prev.filter((_, index) => index !== indexToRemove));
        setMediaPreview(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim() && mediaFiles.length === 0) {
            return;
        }

        const postData = {
            content: content.trim() || null,
            privacy,
            mediaFiles
        };

        try {
            await createPostMutation.mutateAsync({ postData, auth });
            closeModal();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const getPrivacyIcon = (privacyValue) => {
        const option = privacyOptions.find(opt => opt.value === privacyValue);
        return option ? option.icon : Globe;
    };

    return (
        <>
            {/* Create Post Trigger */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex items-center space-x-4">
                    {/* User Profile Image */}
                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                        {user?.profile_image ? (
                            <img
                                src={`${import.meta.env.VITE_API_BASE_URL}/static/user/${user.profile_image}`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">
                                    {user?.name?.charAt(0) || 'U'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* What's on your mind input */}
                    <div
                        className="flex-1 bg-gray-100 rounded-full px-4 py-3 cursor-pointer hover:bg-gray-200 transition-colors"
                        onClick={openModal}
                    >
                        <span className="text-gray-500">What's on your mind?</span>
                    </div>

                    {/* Quick action buttons */}
                    <div className="flex space-x-2">
                        <button
                            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            onClick={openModal}
                        >
                            <Image size={20} />
                        </button>
                        <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            onClick={openModal}
                        >
                            <Video size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-semibold">Create Post</h2>
                            <button
                                onClick={closeModal}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="p-4">
                                    {/* User Info and Privacy */}
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                                            {user?.profile_image ? (
                                                <img
                                                    src={`${import.meta.env.VITE_API_BASE_URL}/static/user/${user.profile_image}`}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                                                    <span className="text-white text-sm font-semibold">
                                                        {user?.name?.charAt(0) || 'U'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{user?.name || 'User'}</p>
                                            <select
                                                value={privacy}
                                                onChange={(e) => setPrivacy(e.target.value)}
                                                className="text-sm bg-gray-100 border-0 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {privacyOptions.map(option => {
                                                    const IconComponent = option.icon;
                                                    return (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Content Textarea */}
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="What's on your mind?"
                                        className="w-full border-0 resize-none text-lg placeholder-gray-500 focus:outline-none"
                                        rows={4}
                                        style={{ minHeight: '100px' }}
                                    />

                                    {/* Media Upload Area */}
                                    <div
                                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                                            isDragging
                                                ? 'border-blue-400 bg-blue-50'
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                    >
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,video/*"
                                            onChange={handleFileInput}
                                            className="hidden"
                                            id="media-upload"
                                        />
                                        <label htmlFor="media-upload" className="cursor-pointer">
                                            <Camera className="mx-auto text-gray-400 mb-2" size={24} />
                                            <p className="text-gray-600">
                                                Drop files here or click to upload
                                            </p>
                                            <p className="text-sm text-gray-400 mt-1">
                                                Images and videos supported
                                            </p>
                                        </label>
                                    </div>

                                    {/* Media Preview */}
                                    {mediaPreview.length > 0 && (
                                        <div className="mt-4">
                                            <div className="grid grid-cols-2 gap-2">
                                                {mediaPreview.map((media, index) => (
                                                    <div key={media.id} className="relative group">
                                                        {media.type === 'image' ? (
                                                            <img
                                                                src={media.url}
                                                                alt={`Preview ${index + 1}`}
                                                                className="w-full h-32 object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <video
                                                                src={media.url}
                                                                className="w-full h-32 object-cover rounded-lg"
                                                                controls
                                                            />
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeMedia(index)}
                                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-center mt-3">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setMediaFiles([]);
                                                        setMediaPreview([]);
                                                    }}
                                                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                >
                                                    Cancel All
                                                </button>
                                                <label htmlFor="media-upload" className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
                                                    Upload More
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Modal Footer */}
                                <div className="p-4 border-t bg-gray-50">
                                    <button
                                        type="submit"
                                        disabled={(!content.trim() && mediaFiles.length === 0) || createPostMutation.isPending}
                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                                    >
                                        {createPostMutation.isPending ? 'Posting...' : 'Post'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreatePost;
