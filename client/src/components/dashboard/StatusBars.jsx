function StatusBars({hunger, mood, cleanliness}) {
    return (
        <div className="status-container">
            <label className="status-label">Hunger</label>
            <progress className="nes-progress is-primary" id="progress" value={hunger} max="100"></progress>
            <label className="status-label">Mood</label>
            <progress className="nes-progress is-success" id="progress" value={mood} max="100"></progress>
            <label className="status-label">Cleanliness</label>
            <progress className="nes-progress is-warning" id="progress" value={cleanliness} max="100"></progress>
        </div>
    )
}

export default StatusBars;