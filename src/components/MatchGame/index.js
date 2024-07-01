import './index.css'
import {Component} from 'react'
import GameItem from '../GameItem'

class MatchGame extends Component {
  state = {
    score: 0,
    time: 60,
    isStop: false,
    imageobj: this.props.imageslist[0],
    tabobj: this.props.tabslist[0],
  }

  componentWillUnmount() {
    clearInterval(this.timerId) // Clears the timer when the component is about to unmount
  }

  Incrementscore = () => {
    const {imageslist} = this.props
    const number = Math.floor(Math.random() * imageslist.length)
    this.setState(prev => ({
      score: prev.score + 1,
      imageobj: imageslist[number],
      tabobj: this.props.tabslist[0],
    }))
  }

  startgame = () => {
    this.starttimer()
    this.setState({
      score: 0,
      time: 60,
      isStop: false,
      imageobj: this.props.imageslist[0],
      tabobj: this.props.tabslist[0],
    })
  }

  endGame = () => {
    const {score} = this.state
    return (
      <div className="game-over-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="tropy-icon"
        />
        <p className="heading-text">YOUR SCORE</p>
        <p className="score">{score}</p>
        <button className="button horizantal" onClick={this.startgame}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
            className="reset-icon"
          />
          <p className="heading-text">PLAY AGAIN</p>
        </button>
      </div>
    )
  }

  fruitTab = () => this.setState({tabobj: this.props.tabslist[0]})

  animalTab = () => this.setState({tabobj: this.props.tabslist[1]})

  placeTab = () => this.setState({tabobj: this.props.tabslist[2]})

  selectimage = () => {
    const {imageobj} = this.state
    return (
      <div className="main-image-container">
        <img src={imageobj.imageUrl} alt="match" className="main-image" />
      </div>
    )
  }

  stopgame = () => {
    clearInterval(this.timerId)
    this.setState({isStop: true, time: 0})
  }

  continueGame = () => {
    const {tabslist, imageslist} = this.props
    const {imageobj, tabobj} = this.state
    const newlist = imageslist.filter(
      element => element.category === tabobj.tabId,
    )
    return (
      <div className="match-body-subcontainer">
        {this.selectimage()}
        <ul className="tabs-container">
          <li>
            <button
              className={`tab-button ${tabobj === tabslist[0] && 'yellow'}`}
              onClick={this.fruitTab}
            >
              {tabslist[0].displayText}
            </button>
          </li>
          <li>
            <button
              className={`tab-button ${tabobj === tabslist[1] && 'yellow'}`}
              onClick={this.animalTab}
            >
              {tabslist[1].displayText}
            </button>
          </li>
          <li>
            <button
              className={`tab-button ${tabobj === tabslist[2] && 'yellow'}`}
              onClick={this.placeTab}
            >
              {tabslist[2].displayText}
            </button>
          </li>
        </ul>
        <ul className="image-items">
          {newlist.map(element => (
            <GameItem
              key={element.id}
              item={element}
              top={imageobj}
              IncrementScore={this.Incrementscore}
              StopGame={this.stopgame}
            />
          ))}
        </ul>
      </div>
    )
  }

  starttimer = () => {
    this.timerId = setInterval(this.countstarts, 1000)
  }

  countstarts = () => {
    const {time} = this.state
    if (time === 0) {
      this.stopgame()
    } else {
      this.setState(prev => ({time: prev.time - 1}))
    }
  }

  componentDidMount() {
    this.starttimer()
  }

  render() {
    const {score, time, isStop} = this.state
    return (
      <div className="container">
        <nav className="nav-bar">
          <div className="game-icon-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <div className="horizantal">
            <ul className="horizantal">
              <li>
                <p className="nav-text">Score:</p>
              </li>
              <li>
                <p className="nav-number">{score}</p>
              </li>
            </ul>
            <ul className="horizantal">
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                  alt="timer"
                  className="timer-icon"
                />
              </li>
              <li>
                <p className="nav-number">{`${time} sec`}</p>
              </li>
            </ul>
          </div>
        </nav>
        <div className="match-body-container">
          {isStop ? this.endGame() : this.continueGame()}
        </div>
      </div>
    )
  }
}
export default MatchGame
