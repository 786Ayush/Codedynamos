import React, { useState } from "react";

const CheckboxBar = () => {
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedData, setSelectedData] = useState([]);
  const data = [
    { id: 1, name: "John Doe", questions: 5 },
    { id: 2, name: "Jane Smith", questions: 8 },
    { id: 3, name: "Alice Johnson", questions: 3 },
  ];

  const handleCheckboxChange = (rowData, checkboxName) => {
    setCheckboxes({
      ...checkboxes,
      [rowData.id]: {
        ...checkboxes[rowData.id],
        [checkboxName]: !checkboxes[rowData.id]?.[checkboxName],
      },
    });
    console.log(checkboxes);
  };

  const handleSelectChange = (rowData) => {
    const selected = checkboxes[rowData.id]?.select || false;
    if (selected) {
      setSelectedData([...selectedData, rowData]);
    } else {
      setSelectedData(selectedData.filter((item) => item.id !== rowData.id));
    }
  };

  const isSelectDisabled = (rowData) => {
    return !checkboxes[rowData.id]?.LOC && !checkboxes[rowData.id]?.LOR && !checkboxes[rowData.id]?.swags;
  };

  return (
    <table className="border border-gray-300 rounded p-4 mb-4 w-full">
      <thead>
        <tr>
          <th className="p-4">Name</th>
          <th className="p-4">Number of questions</th>
          <th className="p-4">LOC</th>
          <th className="p-4">LOR</th>
          <th className="p-4">Swags</th>
          <th className="p-4">Select</th>
        </tr>
      </thead>
      <tbody>
        {data.map((rowData) => (
          <tr key={rowData.id}>
            <td className="p-4 text-center">{rowData.name}</td>
            <td className="p-4 text-center">{rowData.questions}</td>
            <td className="p-4 text-center">
              <input
                type="checkbox"
                className="form-checkbox h-6 w-6 mr-2"
                checked={checkboxes[rowData.id]?.LOC || false}
                onChange={() => handleCheckboxChange(rowData, "LOC")}
              />
            </td>
            <td className="p-4 text-center">
              <input
                type="checkbox"
                className="form-checkbox h-6 w-6 mr-2"
                checked={checkboxes[rowData.id]?.LOR || false}
                onChange={() => handleCheckboxChange(rowData, "LOR")}
              />
            </td>
            <td className="p-4 text-center">
              <input
                type="checkbox"
                className="form-checkbox h-6 w-6 mr-2"
                checked={checkboxes[rowData.id]?.swags || false}
                onChange={() => handleCheckboxChange(rowData, "swags")}
              />
            </td>
            <td className="p-4 text-center">
              <input
                type="checkbox"
                className="form-checkbox h-6 w-6 mr-2"
                checked={checkboxes[rowData.id]?.select || false}
                onChange={() => {
                  handleCheckboxChange(rowData, "select");
                  handleSelectChange(rowData);
                }}
                disabled={isSelectDisabled(rowData)}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="6" className="p-4 text-center">
            Selected Data: {selectedData.map((item) => item.name).join(", ")}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CheckboxBar;
