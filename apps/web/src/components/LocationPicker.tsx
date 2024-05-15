import { Label } from "@radix-ui/react-label";
import { GrMap } from "react-icons/gr";
import React, { useEffect, useState } from "react";

interface LocationPickerProps {
  name: string;
  label: string;
  isError: boolean;
  onChange: (location: string) => void; // Mengubah type dari onChange untuk menerima lokasi string
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  onChange,
  label,
  name,
  isError,
}) => {
  const [location, setLocation] = useState(""); // Menggunakan state untuk lokasi
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  useEffect(() => {
    // Memanggil onChange setiap kali lokasi berubah
    onChange(location);
    setIsLocationSelected(location !== ""); // Mengatur isLocationSelected berdasarkan apakah lokasi telah diisi
  }, [location, onChange]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value); // Mengubah state lokasi saat input berubah
  };

  return (
    <div className="my-2 flex h-[54px] w-full  flex-col rounded-sm px-0 py-2">
      <Label htmlFor={name} className={isError ? "text-red-600" : "text-sm"}>
        {label}
      </Label>
      <div className="flex flex-row items-center justify-start rounded-sm h-12 bg-marine-100 pl-4 text-left font-normal md:w-full">
        <GrMap className={`mr-2 h-12 w-4 ${isLocationSelected ? "text-black" : "text-gray-500"}`} /> {/* Menampilkan ikon */}
        <input
          type="text"
          className={`mx-2 bg-transparent ${
            isError ? "text-red-600" : "text-black"
          }`}
          value={location}
          onChange={handleLocationChange} // Menangani perubahan lokasi
          placeholder="Enter location"
          style={{ width: "100%", outline: "none", border: "none" }}
        />
      </div>
    </div>
  );
};

export default LocationPicker;
