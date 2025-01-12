import Counter from "../../components/Counter";
import PaymentForm from "../../components/PaymentForm";
import PaymentList from "../../components/PaymentList";

const Home = () => {
  return (
    <>
      <PaymentForm />
      <PaymentList />
      <Counter />
    </>
  );
};

export default Home;
