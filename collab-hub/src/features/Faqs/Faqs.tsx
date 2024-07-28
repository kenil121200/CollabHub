import React, { useState } from "react";
import {
  Main,
  InfoContainer,
  Header,
  FaqContainer,
  FaqItem,
  Question,
  Answer,
  ShowMoreText,
  AnswerContainer,
} from "./FaqPageStyles";

const FAQPage = () => {
  const [visibleAnswer, setVisibleAnswer] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I find a developer?",
      answers: [
        "Navigate to the 'Find Developers' feature on our platform.",
        "Use the search and filter options to locate developers by skills, interests, and experience.",
      ],
    },
    {
      question: "How can I join a project group?",
      answers: [
        "Send a request through the Project Collaboration Management Interface.",
        "The project maintainer will review your profile and contributions before approving your request.",
      ],
    },
    {
      question:
        "What should I do if I encounter an issue while collaborating on a project?",
      answers: [
        "Use the chat feature to seek advice or solutions from your project group members.",
        "For more complex problems, consider creating a detailed post to document the issue for further assistance.",
      ],
    },
    {
      question: "How do I contribute to a project?",
      answers: [
        "After joining a project group, you can start contributing by checking out the project tasks.",
        "Pick tasks that match your skills.",
      ],
    },
    {
      question: "How do I manage notifications for project updates?",
      answers: [
        "Navigate to your account settings and select 'Notifications.'",
        "Customize your preferences to receive alerts via email or directly through the platform.",
      ],
    },
  ];

  const toggleAnswer = (index: number) => {
    setVisibleAnswer(visibleAnswer === index ? null : index);
  };

  return (
    <>
      <Main>
        <InfoContainer>
          <Header>Frequently Asked Questions</Header>
          <FaqContainer>
            {faqs.map((faq, index) => (
              <FaqItem key={faq.question}>
                <Question>{faq.question}</Question>
                <Answer>{faq.answers[0]}</Answer>
                {visibleAnswer === index && (
                  <AnswerContainer>
                    {faq.answers.slice(1).map((answer, idx) => (
                      <Answer key={idx}>{answer}</Answer>
                    ))}
                  </AnswerContainer>
                )}
                {faq.answers.length > 1 && (
                  <ShowMoreText onClick={() => toggleAnswer(index)}>
                    {visibleAnswer === index ? "Show less" : "Show more"}
                  </ShowMoreText>
                )}
              </FaqItem>
            ))}
          </FaqContainer>
        </InfoContainer>
      </Main>
    </>
  );
};

export default FAQPage;
