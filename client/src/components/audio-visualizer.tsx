interface AudioVisualizerProps {
  size?: "small" | "medium" | "large";
  isActive?: boolean;
}

export function AudioVisualizer({ size = "medium", isActive = true }: AudioVisualizerProps) {
  const bars = 4;
  const heights = ["h-2", "h-4", "h-3", "h-5"];
  const smallHeights = ["h-1", "h-2", "h-1", "h-3"];
  const largeHeights = ["h-3", "h-6", "h-4", "h-7"];

  const getHeights = () => {
    switch (size) {
      case "small":
        return smallHeights;
      case "large":
        return largeHeights;
      default:
        return heights;
    }
  };

  const getContainerHeight = () => {
    switch (size) {
      case "small":
        return "h-3";
      case "large":
        return "h-7";
      default:
        return "h-5";
    }
  };

  const barHeights = getHeights();

  return (
    <div className={`audio-visualizer ${getContainerHeight()}`}>
      {Array.from({ length: bars }).map((_, index) => (
        <div
          key={index}
          className={`audio-bar ${barHeights[index]} ${isActive ? '' : 'opacity-50'}`}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationPlayState: isActive ? 'running' : 'paused'
          }}
        />
      ))}
    </div>
  );
}
