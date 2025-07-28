import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [type, setType] = useState("math");
  const [number, setNumber] = useState("");
  const [isRandom, setIsRandom] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isRandom && (number === "" || isNaN(number))) {
      setError("Число должно быть в виде цифры");
      return;
    }
    setError("");
    navigate("/result", {
      state: { number, type, isRandom },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Информация о числах</h1>

        <div>
          <label className="block mb-1 font-medium">Тип информации:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="math">Math</option>
            <option value="trivia">Trivia</option>
            <option value="date">Date</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Число:</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            disabled={isRandom}
            className="w-full border rounded p-2"
            placeholder="Введите число"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isRandom}
            onChange={() => setIsRandom(!isRandom)}
          />
          <label>Получить случайное число</label>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Показать результат
        </button>
      </form>
    </div>
  );
}

export default HomePage;