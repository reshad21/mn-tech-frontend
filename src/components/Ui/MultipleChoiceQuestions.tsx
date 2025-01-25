import { useState } from "react";
import { useForm } from "react-hook-form";

const MultipleChoiceQuestions = () => {
  const { register, handleSubmit } = useForm();
  const [score, setScore] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState<string | null>(null);

  const questions = [
    {
      id: "question1",
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      id: "question2",
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars",
    },
  ];

  const calculateScore = (answers: { [key: string]: string }) => {
    let points = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        points += 5;
      }
    });
    return points;
  };

  const determinePromoCode = (points: number) => {
    if (points === 10) {
      return "PROMO10"; // Promo code for all correct answers
    } else if (points === 5) {
      return "PROMO5"; // Promo code for one correct answer
    }
    return null; // No promo code if no correct answers
  };

  const onSubmit = (data: { [key: string]: string }) => {
    const points = calculateScore(data);
    setScore(points);

    // Determine the promo code based on the score
    const code = determinePromoCode(points);
    setPromoCode(code);

    // Add the score and promo code to the data before sending it to the database
    const formData = { ...data, points, promoCode: code };
    console.log("Form Data Submitted:", formData);

    // Example: Send data to the backend
    // axios.post('/api/submit', formData)
    //   .then(response => console.log(response.data))
    //   .catch(error => console.error(error));
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Multiple Choice Questions
      </h1>
      {score !== null && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">
            Your Score: {score}
          </h3>
          <p className="text-gray-700">
            {score === 10
              ? "Excellent! You answered all questions correctly!"
              : score === 5
              ? "Good job! You got one correct answer."
              : "Keep trying! Better luck next time."}
          </p>
          {promoCode && (
            <p className="mt-2 text-green-700 font-semibold">
              Your Promo Code: {promoCode}
            </p>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {questions.map((q) => (
          <div key={q.id} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              {q.question}
            </h2>
            <div className="space-y-2">
              {q.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md cursor-pointer hover:bg-blue-50 transition duration-200"
                >
                  <input
                    type="radio"
                    value={option}
                    {...register(q.id, { required: true })}
                    className="form-radio text-blue-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300 mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MultipleChoiceQuestions;
