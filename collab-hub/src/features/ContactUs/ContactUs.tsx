import { toast } from 'react-toastify';
import Navbar from '../../components/navbar/Navbar';
import { Main, LeftTextSection, InfoContainer, Header, Text, Form, Input, TextArea, Button } from './ContactUsStyles';
const ContactUs: React.FC = () => {

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    toast.success("Thank you for contacting us. We will get back to you as soon as possible.");
  };

  return (
    <>
      <Navbar />
      <Main>
        <Header>Need Help?</Header>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <LeftTextSection>
            <Text>You can fill out the contact form and CollabHub will get back to you as soon as possible. Thank you for your trust.</Text>
          </LeftTextSection>
          <InfoContainer>
            <Form onSubmit={handleSubmit}>
              <Input placeholder="Name" />
              <Input placeholder="Email" required />
              <Input placeholder="Subject" required />
              <TextArea placeholder="Message" required />
              <Button type="submit">Submit</Button>
            </Form>
          </InfoContainer>
        </div>
      </Main>
    </>
  );
};

export default ContactUs;
