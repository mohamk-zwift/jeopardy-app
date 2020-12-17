import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import CreateClones from './deep-clones';

// import jeopardyBoard from '../../data/board1';
import jeopardyBoard from '../../data/boardFinal';

const JeopardyContext = React.createContext();

const SlideCard = ({ cardInfo, isVisible, handleVisible }) => {
  const { handleAnsweredCard } = useContext(JeopardyContext);
  const [toggleFlip, setToggleFlip] = useState(false);

  const handleClosingCard = () => {
    // This handles closing the card and resetting flip status
    setToggleFlip(false);

    handleVisible();
  };

  const handleCompletingCard = () => {
    // This handles closing the card and resetting flip status
    setToggleFlip(false);
    handleAnsweredCard(cardInfo['col'], cardInfo['row']);

    handleVisible();
  };

  return (
    <section className={`c-slide-card-2 ${isVisible ? 'c-slide-card-2--slide-in' : ''}`}>
      <article className='c-slide-card-2__content'>
        <nav className='c-slide-card-2__nav'>
          <button className='c-slide-card-2__button c-slide-card-2__button--close' onClick={handleClosingCard}>
            &times;
          </button>
        </nav>
        <section
          className={`c-slide-card-2__flip-container ${toggleFlip ? 'c-slide-card-2__flip-container--flip' : ''}`}
        >
          <article className='c-slide-card-2__flip-content c-slide-card-2__flip-content--front-side'>
            Q: {cardInfo['question']}
          </article>
          <article className='c-slide-card-2__flip-content c-slide-card-2__flip-content--back-side'>
            A: {cardInfo['answer']}
          </article>
        </section>
        <section>
          <button
            className='c-slide-card-2__button c-slide-card-2__button--regular'
            onClick={() => setToggleFlip(!toggleFlip)}
          >
            Flip Card
          </button>
          <button className='c-slide-card-2__button c-slide-card-2__button--regular' onClick={handleCompletingCard}>
            Card Completed
          </button>
        </section>
      </article>
    </section>
  );
};

SlideCard.propTypes = {
  cardInfo: PropTypes.shape({
    row: PropTypes.number,
    col: PropTypes.number,
    question: PropTypes.string,
    answer: PropTypes.string
  }).isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleVisible: PropTypes.func.isRequired
};

const CellCategory = ({ row, col, value, question, answer, type, isAnswered }) => {
  const { handleSelectCard } = useContext(JeopardyContext);

  let cssCategory;
  if (type === 'question') {
    cssCategory = 'c-jeopardy--font-yellow c-jeopardy--font-lg';
  } else if (type === 'category') {
    cssCategory = 'c-jeopardy--font-white c-jeopardy--font-sm';
  }

  return (
    <div
      className={`c-jeopardy__column-card ${cssCategory}`}
      onClick={() => handleSelectCard(row, col, question, answer)}
    >
      {isAnswered ? '' : value}
    </div>
  );
};

CellCategory.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isAnswered: PropTypes.bool.isRequired
};

const ColumnCategory = ({ col, arrayCategory, arrayAnswered }) => {
  return (
    <section className='c-jeopardy__category-column'>
      {arrayCategory.map((entry, i) => {
        return (
          <CellCategory
            key={i}
            row={i}
            col={col}
            value={entry['value']}
            question={entry['question']}
            answer={entry['answer']}
            type={entry['type']}
            isAnswered={arrayAnswered[i]}
          />
        );
      })}
    </section>
  );
};

ColumnCategory.propTypes = {
  col: PropTypes.number.isRequired,
  arrayCategory: PropTypes.array.isRequired,
  arrayAnswered: PropTypes.bool.isRequired
};

const createQuestionMatrix = (data) => {
  const boolMatrix = new Array(data.length).fill().map(() => []);
  for (let i = 0; i < data.length; i++) {
    boolMatrix[i] = new Array(data[i].length).fill(false);
  }

  return boolMatrix;
};

const createDeepClone = (obj) => {
  return CreateClones.selectClone(obj);
};

const JeopardyApp = () => {
  const [questionMatrix, setQuestionMatrix] = useState(createQuestionMatrix(jeopardyBoard));
  const [toggleSlide, setToggleSlide] = useState(false);
  const [cardInfo, setCardInfo] = useState({ row: -1, col: -1, question: '', answer: '' });

  const handleSlideCard = () => setToggleSlide(!toggleSlide);

  const handleSelectCard = (row, col, question, answer) => {
    //set card value
    setCardInfo({ row, col, question, answer });
    //display slide card
    handleSlideCard();
  };

  const handleAnsweredCard = (row, col) => {
    // Method: This will toggle 'true' or 'false' for the question answer
    const cloneMatrix = createDeepClone(questionMatrix);
    cloneMatrix[row][col] = !cloneMatrix[row][col];
    setQuestionMatrix(cloneMatrix);

    //hide card
    handleSlideCard();
  };

  return (
    <div className='u-h-100vh u-w-100vw u-flex'>
      <JeopardyContext.Provider value={{ handleSelectCard, handleAnsweredCard }}>
        <SlideCard isVisible={toggleSlide} handleVisible={handleSlideCard} cardInfo={cardInfo} />
        <section className='c-jeopardy'>
          {jeopardyBoard.map((entry, i) => {
            return <ColumnCategory key={i} col={i} arrayCategory={entry} arrayAnswered={questionMatrix[i]} />;
          })}
        </section>
      </JeopardyContext.Provider>
    </div>
  );
};

export { JeopardyApp };
