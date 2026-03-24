import { useState } from "react";

function InputPanel({ onRun }) {

  const [capacity, setCapacity] = useState(10);

  const [crops, setCrops] = useState([
    { name: "Rice", land: "", profit: "" },
    { name: "Wheat", land: "", profit: "" }
  ]);

  const addCrop = () => {
    setCrops([...crops, { name: "", land: "", profit: "" }]);
  };

  const updateCrop = (index, field, value) => {
    const updated = [...crops];
    updated[index][field] = value;
    setCrops(updated);
  };

  const removeCrop = (index) => {
    const updated = crops.filter((_, i) => i !== index);
    setCrops(updated);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl">

        <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-600 text-center">
        Crop Input Panel
        </h2>

        {/* Total Land */}

        <div className="mb-5">
        <label className="font-semibold text-gray-700">
            Total Land Capacity
        </label>

        <input
            type="number"
            min="0"
            placeholder="Enter total land"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value === "" ? "" : Number(e.target.value))}
            className="border p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        </div>



        {/* Crop Table */}

        <div className="space-y-3">

        {/* Column Headers */}

        <div className="hidden md:grid grid-cols-4 gap-2 mb-2 font-semibold text-gray-700">
            <div>Crop Name</div>
            <div>Land Required</div>
            <div>Profit</div>
            <div>Action</div>
        </div>



        {crops.map((crop, index) => (

            <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-gray-50 p-3 rounded"
            >

            <input
                type="text"
                placeholder="Crop Name"
                value={crop.name}
                onChange={(e) =>
                updateCrop(index, "name", e.target.value)
                }
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
                type="number"
                min="0"
                placeholder="Land"
                value={crop.land}
                onChange={(e) =>
                updateCrop(index, "land", 
                    e.target.value === "" ? "" : Number(e.target.value)
                )
                }
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
                type="number"
                min="0"
                placeholder="Profit"
                value={crop.profit}
                onChange={(e) =>
                updateCrop(index, "profit", 
                    e.target.value === "" ? "" : Number(e.target.value)
                )
                }
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
                onClick={() => removeCrop(index)}
                className="bg-red-500 text-white rounded px-3 py-2 hover:bg-red-600 transition"
            >
                Remove
            </button>

            </div>

        ))}

        </div>



        {/* Buttons */}

        <div className="flex flex-col md:flex-row gap-3 mt-6">

        <button
            onClick={addCrop}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full md:w-auto"
        >
            Add Crop
        </button>

        <button
            onClick={() => {
                if (capacity === "" || crops.some(c => c.land === "" || c.profit === "")) {
                    alert("Please fill in all fields.");
                    return;
                }
                onRun(crops, capacity);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto"
        >
            Run Optimization
        </button>

        </div>

    </div>
    );
}

export default InputPanel;