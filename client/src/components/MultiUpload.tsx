import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { TbPhotoPlus, TbX } from "react-icons/tb";

interface ImageProps {
  disabled?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
}

const MultiUpload = ({ value, onChange }: ImageProps) => {
  const [previews, setPreviews] = useState<string[]>(value || []);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSizeMB = 5; // 5MB max file size

    const validFiles = files.filter((file) => file.size / 1024 / 1024 <= maxSizeMB);
    const invalidFiles = files.length - validFiles.length;

    if (invalidFiles > 0) {
      toast.error(`${invalidFiles} file(s) are too large. Please select files smaller than 5MB.`);
    }

    const newPreviews: string[] = [];

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          newPreviews.push(reader.result as string);

          // Once all files have been read, update previews and onChange
          if (newPreviews.length === validFiles.length) {
            const updatedPreviews = [...previews, ...newPreviews];
            setPreviews(updatedPreviews);
            onChange(updatedPreviews);
          }
        }
      };
    });
  };

  useEffect(() => {
    if (value) {
      setPreviews(value);
    }
  })

  const handleRemoveImage = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    onChange(updatedPreviews);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />

      {previews.length === 0 && (
        <div
          onClick={handleUploadClick}
          className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 h-full"
        >
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click to Upload</div>
        </div>
      )}

      {previews.length > 0 && (
        <div className="grid grid-cols-4 gap-5 mt-4 max-lg:grid-cols-3 max-md:grid-cols-2">
          {previews.map((src, index) => (
            <div key={index} className="relative w-full h-full border border-black">
              <img className="object-cover w-full h-full" src={src} alt={`Uploaded ${index + 1}`} />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage(index);
                }}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
              >
                <TbX size={24} className="text-black" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MultiUpload;
