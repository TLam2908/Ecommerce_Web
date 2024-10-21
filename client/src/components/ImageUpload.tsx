import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { TbPhotoPlus, TbX } from "react-icons/tb"; // Import the "remove" icon

interface ImageProps {
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void; // Change type to void since it removes all images
}

const ImageUpload = (props: ImageProps) => {
  const { value, onChange, onRemove } = props;

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file if available
    const maxSizeMB = 5; // 5MB max file size
    if (file) {
      if (file.size / 1024 / 1024 > maxSizeMB) {
        toast.error("File is too large. Please select a file smaller than 5MB.");
        return;
      }
      setPreview(URL.createObjectURL(file)); // Update preview state
      TransformDataType(file); // Transform
    }
  };

  const TransformDataType = (file: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        onChange(reader.result as string); // Ensure result is treated as string
      }
    };
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div
        onClick={handleUploadClick}
        className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 h-full"
      >
        <TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">Click to Upload</div>
        {preview && (
          <div className="absolute inset-0 w-full h-full">
            {/* Uploaded image */}
            <img className="object-cover w-full h-full" src={preview} alt="Uploaded" />
            {/* Remove button in the top-right corner */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the upload
                onRemove(); // Call the remove function
                setPreview(null); // Clear the preview
              }}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
            >
              <TbX size={24} className="text-black" />
            </button>
          </div>
        )}
        {value && (
          <div className="absolute inset-0 w-full h-full">
            {/* Uploaded image */}
            <img className="object-cover w-full h-full" src={value} alt="Uploaded" />
            {/* Remove button in the top-right corner */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the upload
                onRemove(); // Call the remove function
                setPreview(null); // Clear the preview
              }}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
            >
              <TbX size={24} className="text-black" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
