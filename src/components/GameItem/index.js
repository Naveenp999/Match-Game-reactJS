import './index.css'

const GameItem = props => {
  const {item, top, IncrementScore, StopGame} = props
  const check = () => {
    if (item.id === top.id) {
      IncrementScore()
    } else {
      StopGame()
    }
  }
  return (
    <li>
      <button className="image-button" onClick={check}>
        <img src={item.thumbnailUrl} alt="thumbnail" className="game-item" />
      </button>
    </li>
  )
}

export default GameItem
