import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import MessageComponent from "./components/MessageComponent";

const App = () => {
  return (
    <>
      {/* <Login /> */}
      {/* <CreateAccount /> */}
      <MessageComponent
        title={"Sdfs"}
        message={"sadfsa"}
        onClose={() => {
          console.log(new Date());
        }}
      />
    </>
  );
};

export default App;
