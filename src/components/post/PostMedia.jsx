import React from "react";

const isImage = (filename) => {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
};

const isVideo = (filename) => {
  return /\.(mp4|webm|ogg)$/i.test(filename);
};

const PostMedia = ({ media }) => {
  if (!media || media.length === 0) return null;

  const mediaCount = media.length;

  let gridCols = "grid-cols-1";
  if (mediaCount === 2) gridCols = "grid-cols-2";
  else if (mediaCount >= 3) gridCols = "md:grid-cols-3";

  return (
      <div className={`grid gap-2 ${gridCols}`}>
        {media.map((item, index) => {
          const fileUrl = `${import.meta.env.VITE_API_BASE_URL}/static/${item.file}`;

          return (
              <div
                  key={item.id || index}
                  className="bg-gray-100 rounded-lg overflow-hidden max-h-[500px] flex items-center justify-center"
              >
                {isImage(item.file) ? (
                    <img
                        src={fileUrl}
                        alt={`Post media ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : isVideo(item.file) ? (
                    <video
                        controls
                        src={fileUrl}
                        className="w-full h-full object-contain"
                    >
                      Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="p-4 text-sm text-gray-600 text-center">
                      Unsupported media file: {item.file}
                    </div>
                )}
              </div>
          );
        })}
      </div>
  );
};

export default PostMedia;
