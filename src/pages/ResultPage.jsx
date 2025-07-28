import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { number, type, isRandom } = location.state || {};

  const [fact, setFact] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (type == null) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const url = isRandom
          ? `http://numbersapi.com/random/${type}`
          : `http://numbersapi.com/${number}/${type}`;
        const response = await axios.get(url);
        setFact(response.data);
      } catch (err) {
        setError("Ошибка при загрузке данных");
      }
    };

    fetchData();
  }, [number, type, isRandom, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-xl space-y-4">
        <h2 className="text-2xl font-bold text-center">Результат</h2>

        <div>
          <p><strong>Тип:</strong> {type}</p>
          <p><strong>Число:</strong> {isRandom ? "Случайное" : number}</p>
        </div>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-lg">{fact}</p>
        )}

        <button
          onClick={() => navigate("/")}
          className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded"
        >
          Назад
        </button>
      </div>
    </div>
  );
}

export default ResultPage;