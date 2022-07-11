import Authorization from "./components/Authorization";

const App = () => {
    return (
        <Authorization onSubmit={console.log}/>
    );
};

export default App;
