import React from "react";
import {
  Main,
  InfoContainer,
  Header,
  FaqContainer,
  FaqItem,
  Question,
  Answer,
} from "./FaqPageStyles";

const FAQPage = () => {
  const faqs = [
    {
      question: "How do I find a developer?",
      answer:
        'Navigate to the "Find Developers" feature on our platform, use the search and filter options to locate developers by skills, interests, and experience.',
    },
    {
      question: "How can I join a project group?",
      answer:
        "Send a request through the Project Collaboration Management Interface. The project maintainer will review your profile and contributions before approving your request.",
    },
    {
      question:
        "What should I do if I encounter an issue while collaborating on a project?",
      answer:
        "Use the chat feature to seek advice or solutions from your project group members. For more complex problems, consider creating a detailed post to document the issue for further assistance.",
    },
    {
      question: "How do I contribute to a project?",
      answer:
        "After joining a project group, you can start contributing by checking out the project tasks and picking tasks that match your skills.",
    },
    {
      question: "How do I manage notifications for project updates?",
      answer:
        "To manage notifications, navigate to your account settings and select 'Notifications.' Here, you can customize your preferences to receive alerts via email or directly through the platform for project updates, new messages, or collaboration requests.",
    },
  ];

  return (
    <>
      <Main>
        <InfoContainer>
          <Header>Frequently Asked Questions</Header>
          <FaqContainer>
            {faqs.map((faq) => (
              <FaqItem key={faq.question}>
                <Question>{faq.question}</Question>
                <Answer>{faq.answer}</Answer>
              </FaqItem>
            ))}
          </FaqContainer>
        </InfoContainer>
      </Main>
    </>
  );
};

export default FAQPage;
