import styled from '@emotion/styled';
import { Statistics } from '../statistics/statistics';
import { FeedbackOptions } from '../feedbackOptions/feedbackOptions';
import { Section } from '../section/section';
import { Notification } from '../notification/notification';
import { useState } from 'react';

export const Feedback = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const state = { good, neutral, bad };

  const selectedFeedback = e => {
    switch (e.currentTarget.name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    return Object.values(state).reduce((total, item) => total + item, 0);
  };

  const optionKeys = Object.keys(state);

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const result = (good * 100) / total;
    return Math.round(result);
  };

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          onLeaveFeedback={selectedFeedback}
          options={optionKeys}
        />
        {countTotalFeedback() === 0 ? (
          <Notification message="There is no feedback"></Notification>
        ) : (
          <Statistics
            {...state}
            total={countTotalFeedback()}
            percent={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </Container>
  );
};

export default Feedback;

///////////////////////////////////    STYLE    ///////////////////////////

const Container = styled.div`
  padding: 50px;
`;
