import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center mt-5">
            <h1>Witaj w aplikacji!</h1>
            <p className="lead">Zarządzaj postami i przeglądaj szczegóły.</p>
            <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/posts")}
            >
                Przejdź do postów
            </button>
        </div>
    );
};

export default Home;
