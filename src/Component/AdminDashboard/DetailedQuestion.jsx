import { useState } from "react";
import { Input, Button, Card } from "@nextui-org/react";

const DetailedQuestion = () => {
  const [question, setQuestion] = useState("");
  const [questionsList, setQuestionsList] = useState([]);

  const handleAddQuestion = () => {
    if (question.trim() !== "") {
      setQuestionsList([...questionsList, question]);
      setQuestion("");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border"
        />
      </div>
      <div className="mb-4">
        <Button color="primary" onClick={handleAddQuestion}>
          Button
        </Button>
      </div>
      <div>
        {questionsList.map((q, index) => (
          <Card key={index} shadow className="mb-2">
            <p className="text-lg">{q}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DetailedQuestion;
