import React, { useState } from "react";

const CheckboxBar = () => {
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedData, setSelectedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const data = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ];

  const handleCheckboxAndSelectChange = (rowData, checkboxName) => {
    const updatedCheckboxState = {
      ...checkboxes,
      [rowData.id]: {
        ...checkboxes[rowData.id],
        [checkboxName]: !checkboxes[rowData.id]?.[checkboxName],
      },
    };

    const updatedSelectedData = !checkboxes[rowData.id]?.[checkboxName]
      ? [...selectedData, rowData]
      : selectedData.filter((item) => item.id !== rowData.id);

    setCheckboxes(updatedCheckboxState);
    setSelectedData(updatedSelectedData);
  };

  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().includes(searchTerm)
    );
  });

  return (
    <div className="overflow-x-auto m-4 bg-white p-3 rounded">
      <input
        type="text"
        placeholder="Search by name or ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <table className="border border-gray-300 rounded p-4 mb-4 w-full">
        <thead>
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Select</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((rowData) => (
            <tr key={rowData.id}>
              <td className="p-4 text-center">{rowData.id}</td>
              <td className="p-4 text-center">{rowData.name}</td>
              <td className="p-4 text-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-6 w-6 mr-2"
                  checked={checkboxes[rowData.id]?.select || false}
                  onChange={() =>
                    handleCheckboxAndSelectChange(rowData, "select")
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="p-4 text-center">
              Selected Data: {selectedData.map((item) => item.name).join(", ")}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="flex justify-center w-full">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default CheckboxBar;
