import { useEffect, useState } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import { supabase } from "../../utils/Supabase";

const DetailedQuestion = () => {
  const [question, setQuestion] = useState("");
  const [questionsList, setQuestionsList] = useState([]);
  const [index, setIndex] = useState(null); // Initialize index state
  const [level, setLevel] = useState("Basic"); // Initialize level state

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const indexParam = params.get("index");
    if (indexParam) {
      setIndex(indexParam);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (index) {
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .eq("Sector", InternshipDomains[parseInt(index) - 1]?.value);

        if (error) {
          console.error("Error fetching questions:", error);
        } else {
          setQuestionsList(data);
        }
      }
    };
    fetchData();
  }, [index]);

  const handleAddQuestion = async () => {
    if (question.trim() !== "") {
      const questionData = {
        QuestionText: question,
        Sector: InternshipDomains[parseInt(index) - 1]?.value,
        Current_question: false,
        level: level,
      };
      const { data, error } = await supabase
        .from("questions")
        .insert([questionData]);

      if (error) {
        console.error("Error adding question:", error);
        return { success: false, error };
      }

      setQuestionsList((prevQuestions) => [...prevQuestions, questionData]);
      setQuestion("");
    }
  };

  const handleCheckboxChange = (questionIndex) => {
    const updatedQuestions = [...questionsList];
    updatedQuestions[questionIndex].checked = !updatedQuestions[questionIndex].checked;

    // Count the number of checked questions
    const checkedCount = updatedQuestions.filter((q) => q.checked).length;

    // Allow only up to 5 questions to be checked
    if (checkedCount <= 5) {
      setQuestionsList(updatedQuestions);
    } else {
      // If more than 5, uncheck the last checked
      updatedQuestions[questionIndex].checked = false;
    }
  };

  const handleDeleteQuestion = (questionIndex) => {
    const updatedQuestions = questionsList.filter((_, i) => i !== questionIndex);
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
        <div className="mb-4 flex justify-between items-center">
          <div>
            <label htmlFor="level">Level:</label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="border p-2 ml-2"
            >
              <option value="Basic">Basic</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
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
          {questionsList.map((q, i) => (
            <Card key={i} shadow className="mb-2">
              <div className="flex items-center justify-between p-2">
                <div className="flex flex-col w-[80%]">
                  <p className="text-lg">{q.QuestionText}</p>
                  <p className="text-sm text-gray-500">Level: {q.level}</p>
                </div>
                <div className="chk">
                  <input
                    type="checkbox"
                    checked={q.Current_question || false}
                    onChange={() => handleCheckboxChange(i)}
                  />
                </div>
                <div className="btn">
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteQuestion(i)}
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
