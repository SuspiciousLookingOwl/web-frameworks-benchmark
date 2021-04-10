import { useState } from "react";
import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";

import FrameworkSelector, {
  SelectOption,
} from "../components/FrameworkSelector";
import { BenchmarkDataSet } from "../App";

interface Props {
  benchmarks: BenchmarkDataSet[];
}

function BarChart({ benchmarks }: Props) {
  const [data, setData] = useState<ChartData>({
    labels: ["Speed (64)", "Speed (256)", "Speed (512)"],
    datasets: [],
  });

  // FrameworkSelector onChange handler
  const onChange = (selectedOptions: SelectOption[]) => {
    // Get benchmark data from selected frameworks id
    const filteredBenchmark = selectedOptions.map(
      (option) => benchmarks.find((b) => b.id === option.value)!
    );

    setData({ ...data, datasets: filteredBenchmark });
  };

  return (
    <div>
      <h3 className="text-center">Compare Frameworks</h3>

      <FrameworkSelector
        options={benchmarks.map((b) => ({
          value: b.id,
          label: `${b.language} - ${b.framework.name} (${b.framework.version})`,
          color: b.color,
        }))}
        onChange={onChange}
      />

      <div className="pt-md">
        <Bar data={data} height={100} />
      </div>
    </div>
  );
}

export default BarChart;
