import { useEffect, useState } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import { useParams } from "react-router-dom";

const DetailedQuestion = () => {
  const [question, setQuestion] = useState("");
  const [questionsList, setQuestionsList] = useState([]);
  const [index, setIndex] = useState(null); // Initialize index state

  useEffect(() => {
    // Parse index from query parameter
    const params = new URLSearchParams(window.location.search);
    const indexParam = params.get("index");
    setIndex(indexParam);
  }, []);
  const InternshipDomains = [
    { index: 1, value: "Artificial Intelligence Intern" },
    { index: 2, value: "Data Science Intern" },
    { index: 3, value: "Web Development Intern" },
    { index: 4, value: "Java Development Intern" },
    { index: 5, value: "Android Development Intern" },
    { index: 6, value: "Python Development Intern" },
    { index: 7, value: "Graphics Design Intern" },
    { index: 8, value: "Content Writer Intern" },
  ];

  const handleAddQuestion = () => {
    if (question.trim() !== "") {
      setQuestionsList([...questionsList, { text: question, checked: false }]);
      setQuestion("");
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedQuestions = [...questionsList];
    updatedQuestions[index].checked = !updatedQuestions[index].checked;

    // Count the number of checked questions
    const checkedCount = updatedQuestions.filter((q) => q.checked).length;

    // Allow only up to 5 questions to be checked
    if (checkedCount <= 5) {
      setQuestionsList(updatedQuestions);
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questionsList];
    updatedQuestions.splice(index, 1);
    setQuestionsList(updatedQuestions);
  };

  return (
    <>
      <div className="p-4 bg-white rounded shadow-md mb-2">
        <div className="text-3xl font-semibold mb-4">
          {InternshipDomains[parseInt(index) - 1]?.value}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border w-full p-3"
          />
        </div>
        <div className="mb-4 flex justify-end">
          <button
            className="bg-primary text-white p-3 rounded"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow-md">
        <div>
          {questionsList.map((q, index) => (
            <Card key={index} shadow className="mb-2">
              <div className="flex items-center justify-between">
                <p className="text-lg w-[80%]">{q.text}</p>
                <div className="chk">
                  <input
                    type="checkbox"
                    checked={q.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </div>
                <div className="btn">
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailedQuestion;