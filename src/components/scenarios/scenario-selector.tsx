import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scenarios } from "@/data/scenarios";

interface ScenarioSelectorProps {
  selectedScenario: string;
  onSelect: (scenarioId: string) => void;
}

export function ScenarioSelector({
  selectedScenario,
  onSelect,
}: ScenarioSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Demo Scenarios</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {scenarios.map((scenario) => (
          <Button
            key={scenario.id}
            variant={selectedScenario === scenario.id ? "default" : "outline"}
            className="h-auto w-full justify-start text-left"
            onClick={() => onSelect(scenario.id)}
          >
            <div>
              <div>{scenario.title}</div>

              <div className="text-xs opacity-70">{scenario.customerName}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
