import { useState } from "react";

export default function GhostLockDashboard() {
  const [bankroll, setBankroll] = useState(1000);
  const [unitPercent, setUnitPercent] = useState(1);
  const [bets, setBets] = useState([]);
  const [game, setGame] = useState("");
  const [pick, setPick] = useState("");
  const [confidence, setConfidence] = useState(3);

  const unitSize = bankroll * (unitPercent / 100);

  const getUnits = (conf) => {
    if (conf === 5) return 5;
    if (conf === 4) return 3.5;
    if (conf === 3) return 2;
    if (conf === 2) return 1;
    return 0.5;
  };

  const addBet = () => {
    if (!game || !pick) return;

    const units = getUnits(confidence);
    const amount = units * unitSize;

    const newBet = {
      id: Date.now(),
      game,
      pick,
      confidence,
      units,
      amount,
      result: "pending",
    };

    setBets([newBet, ...bets]);
    setGame("");
    setPick("");
  };

  const settleBet = (id, result) => {
    const updated = bets.map((bet) => {
      if (bet.id === id && bet.result === "pending") {
        if (result === "win") {
          setBankroll((prev) => prev + bet.amount);
        } else {
          setBankroll((prev) => prev - bet.amount);
        }
        return { ...bet, result };
      }
      return bet;
    });

    setBets(updated);
  };

  const totalProfit = bankroll - 1000;
  const wins = bets.filter((b) => b.result === "win").length;
  const losses = bets.filter((b) => b.result === "loss").length;
  const winRate = bets.length ? ((wins / (wins + losses)) * 100).toFixed(1) : 0;

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>GhostLock Dashboard</h1>

      <div style={{ marginBottom: 20 }}>
        <h2>Bankroll</h2>
        <input
          type="number"
          value={bankroll}
          onChange={(e) => setBankroll(Number(e.target.value))}
        />
        <p>Unit Size: ${unitSize.toFixed(2)}</p>
        <p>Profit/Loss: ${totalProfit.toFixed(2)}</p>
        <p>Win Rate: {winRate}%</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h2>Add Bet</h2>
        <input
          placeholder="Game"
          value={game}
          onChange={(e) => setGame(e.target.value)}
        />
        <input
          placeholder="Pick"
          value={pick}
          onChange={(e) => setPick(e.target.value)}
        />
        <input
          type="number"
          min={1}
          max={5}
          value={confidence}
          onChange={(e) => setConfidence(Number(e.target.value))}
        />
        <button onClick={addBet}>Add Bet</button>
      </div>

      <div>
        <h2>Bet Tracker</h2>
        {bets.map((bet) => (
          <div key={bet.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
            <p><strong>{bet.game}</strong></p>
            <p>{bet.pick}</p>
            <p>{bet.confidence}⭐ | {bet.units}u | ${bet.amount.toFixed(2)}</p>
            <p>Status: {bet.result}</p>
            {bet.result === "pending" && (
              <>
                <button onClick={() => settleBet(bet.id, "win")}>Win</button>
                <button onClick={() => settleBet(bet.id, "loss")}>Loss</button>
              </>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 30 }}>
        <h2>GhostLock AI (Manual Input)</h2>
        <p>Paste analysis prompt into ChatGPT/Claude and log picks here.</p>
        <button onClick={() => navigator.clipboard.writeText("Use GhostLock AI system to analyze today's games with confidence ratings and unit sizing.")}>Copy AI Prompt</button>
      </div>
    </div>
  );
}
