import React from 'react';
import { Route } from 'react-router-dom'
import Modal from './Modal';
import '../stylesheets/Games.scss'

export default class Games extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hot: true,
      isModalOpen: false,
      input: "",
      secret: 101,
      guessed: [],
      feedback: ""
    }
  }

  componentWillMount() {
    let randomNumber = Math.floor((Math.random() * 100) + 1);
    this.setState({secret: randomNumber});
  }

  setTemperature(isHot) {
    const temp = this.state.hot;
    if (temp !== isHot) this.setState({hot: isHot});
  }

  openHowToPlay() {
    this.setState({ isModalOpen: true })
  }

  closeHowToPlay() {
    this.setState({ isModalOpen: false })
  }

  addGuess(userInput) {
    let guessed = this.state.guessed.slice();
    guessed.push(userInput);
    this.setState({guessed: guessed});
  }

  getFeedback(userInput) {
    this.addGuess(userInput);
    const secret = this.state.secret;
    if (userInput == secret) {
      this.setState({feedback: "you got it!"});
      this.setTemperature(true);
    } else if (Math.abs(secret - userInput) < 10) {
      this.setState({feedback: "hot!"});
      this.setTemperature(true);
    } else {
      this.setState({feedback: "cold..."});
      this.setTemperature(false);
    }
  }

  handleInput(e) {
    const inputVal = e.target.value;
    this.setState({input: inputVal});
  }

  handleSubmit(e) {
    e.preventDefault();
    const userInput = this.state.input;
    this.getFeedback(userInput); 
  }

  render() {
    let guessed = [];
    const guessedNumbers = this.state.guessed;
    let anyGuesses = false;
    if (guessedNumbers.length > 0) anyGuesses = true;
    for (let guess of guessedNumbers) {
      let eachGuess = <div className="guess">{guess}</div>
      guessed.push(eachGuess);
    }
    const isHot = this.state.hot;
    const feedback = this.state.feedback;
    return (
      <div>
      <span id="howToPlayLink" onClick={() => this.openHowToPlay()}>huh?</span>
      <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeHowToPlay()}>
        <h1 className="howToPlayTitle">how to play:</h1>
        <ul className="howToPlayList">
          <li>i pick a <span className="hotText">random number</span> between 1 and 100 and keep it secret</li>
          <li>you need to <span className="hotText">guess</span> until you find the hidden secret number</li>
          <li>i'll tell you if you're <span className="hotText">hot</span> or <span className="coldText">cold</span>!</li>
        </ul>
        <button className="exitHowToPlay" onClick={() =>  this.closeHowToPlay()}>got it!</button>
      </Modal>
      <Route render={({ history}) => (
          <span id="gamesToHomeLink" onClick={() => { history.push('/') }}>home</span>
        )} />
        <div className={isHot ? "gamesView hot" : "gamesView cold"}>
          <h1 className="gamesTitle">hot or cold?</h1>
          <div className="gameArea">
            <div className="inputArea">
              <h1 className="inputTitle">please enter a number:</h1>
              <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                  <input type="number" id="inputVal" min="1" max="100" onChange={e => this.handleInput(e)} />
                </form>
              </div>
              <h2 className={anyGuesses ? "guessedTitle" : "guessedTitle hidden"}>previous guesses:</h2>
              <div className="guessedNumbers">
                {guessed}
              </div>
            </div>
            <div className="feedbackArea">
              <h1 className="feedbackTitle">{feedback}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
