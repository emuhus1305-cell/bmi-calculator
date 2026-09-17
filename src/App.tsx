import { useState } from "react";

type BMIEntry = {
  id: number;
  height: number;
  weight: number;
  bmi: number;
};

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [entries, setEntries] = useState<BMIEntry[]>([]);

  const bmi =
    height && weight ? Number(weight) / (Number(height) / 100) ** 2 : 0;

  const saveEntry = () => {
    if (!height || !weight || bmi <= 0) return;

    const newEntry: BMIEntry = {
      id: Date.now(),
      height: Number(height),
      weight: Number(weight),
      bmi: Number(bmi.toFixed(1)),
    };

    setEntries([...entries, newEntry]);
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="app">
      <div className="calculator">
        <h1>BMI Calculator</h1>
        <p className="subtitle">Check your body mass index</p>

        <div className="inputs">
          <div>
            <label>Height</label>
            <input
              type="number"
              placeholder="Height in cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div>
            <label>Weight</label>
            <input
              type="number"
              placeholder="Weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>

        <div className="result">
          <p>Your BMI</p>
          <h2>{bmi > 0 ? bmi.toFixed(1) : "--"}</h2>
        </div>

        <button className="save-button" onClick={saveEntry}>
          Save Entry
        </button>

        <div className="history">
          <h2>Saved Entries</h2>

          {entries.length === 0 ? (
            <p className="empty">No saved entries yet.</p>
          ) : (
            entries.map((entry) => (
              <div className="entry" key={entry.id}>
                <div>
                  <strong>BMI: {entry.bmi}</strong>
                  <p>
                    {entry.height} cm · {entry.weight} kg
                  </p>
                </div>

                <button
                  className="delete-button"
                  onClick={() => deleteEntry(entry.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
