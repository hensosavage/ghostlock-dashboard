import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GhostLockDashboard() {
  const [bankroll, setBankroll] = useState(1000);
  const [unitSize, setUnitSize] = useState(10);
  const [bets, setBets] = useState([]);
  const [game, setGame] = useState("");
  const [pick, setPick] = useState("");
  const [confidence, setConfidence] = useState(3);

  const addBet = () => {
    const units = confidence === 5 ? 5 : confidence === 4 ? 3.5 : confidence === 3 ? 2 : confidence === 2 ? 1 : 0.5;
    const amount = units * unitSize;

    const newBet = {
      game,
      pick,
      confidence,
      units,
      amount,
      result: "pending",
    };

    setBets([...bets, newBet]);
    setGame("");
    setPick("");
  };

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-2xl font-bold">GhostLock Dashboard</h1>

      <Card>
        <CardContent className="p-4 grid gap-3">
          <h2 className="font-semibold">Bankroll Settings</h2>
          <Input
            type="number"
            value={bankroll}
            onChange={(e) => setBankroll(Number(e.target.value))}
            placeholder="Bankroll"
          />
          <Input
            type="number"
            value={unitSize}
            onChange={(e) => setUnitSize(Number(e.target.value))}
            placeholder="Unit Size"
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 grid gap-3">
          <h2 className="font-semibold">Add New Bet</h2>
          <Input value={game} onChange={(e) => setGame(e.target.value)} placeholder="Game" />
          <Input value={pick} onChange={(e) => setPick(e.target.value)} placeholder="Pick" />
          <Input
            type="number"
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            min={1}
            max={5}
          />
          <Button onClick={addBet}>Add Bet</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-3">Bet Tracker</h2>
          <div className="grid gap-2">
            {bets.map((bet, index) => (
              <div key={index} className="p-3 border rounded-xl">
                <p><strong>{bet.game}</strong></p>
                <p>{bet.pick}</p>
                <p>Confidence: {bet.confidence}⭐</p>
                <p>Units: {bet.units}</p>
                <p>Amount: ${bet.amount}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
