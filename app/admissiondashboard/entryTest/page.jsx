'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Page() {
    const router = useRouter();
    const Ref = useRef(null);
    const [timer, setTimer] = useState("00:10:00");

    const getTimeRemaining = (e) => {
        const total = Date.parse(e.toString()) - Date.parse(new Date().toString());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return { total, hours, minutes, seconds };
    };

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9 ? minutes : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };

    const clearTimer = (e) => {
        setTimer("00:10:00");
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 600);
        return deadline;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    const [pageIndex, setPageIndex] = useState(0);
    const [answered, setAnswered] = useState({});
    const [score, setScore] = useState(0);

    const quizData = [
        {
            id: 1,
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Rome"],
            answer: "Paris",
        },
        {
            id: 2,
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4",
        },
        {
            id: 3,
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Mars",
        },
    ];

    const addAnswer = (e) => {
        const { name, value } = e.target;
        const latestAnswers = { ...answered, [name]: value };
        setAnswered(latestAnswers);
        window.localStorage.setItem("quiz", JSON.stringify(latestAnswers));
    };

    const calculateScore = () => {
        let calculatedScore = 0;
        quizData.forEach((q) => {
            if (answered[q.id] === q.answer) calculatedScore++;
        });
        setScore(calculatedScore);
        alert("score: "+calculatedScore)
    };

    if (timer === "00:00:00") {
        calculateScore();
    }

    const currentQuestion = quizData[pageIndex];
    const totalQuestions = quizData.length;

    return (
        <div className='relative overflow-hidden'>
            <div className="bg-primary-foreground absolute top-0 left-0 bg-gradient-to-b bg-background/50 blur bottom-0 leading-5 h-[50%] rotate-45 w-full overflow-hidden rounded-3xl"></div>
            <div className="flex justify-center self-center z-10 m-2">
                <div className="backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
                    <div className="mb-7">
                        <h3 className="font-semibold text-2xl text-gray-800 text-center">Personal Data</h3>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full text-2xl font-bold mb-4">
                        <h2 className={parseInt(timer.split(":")[1]) < 1 ? "text-red-500" : ""}>
                            {timer}
                        </h2>

                        <p>
                            {pageIndex + 1} of {totalQuestions}
                        </p>
                    </div>
                    <div>
                        <div key={currentQuestion.id}>
                            <p>{currentQuestion.question}</p>
                        </div>
                        <ul>
                            {currentQuestion.options.map((option, i) => (
                                <li className="list-none my-3" key={i}>
                                    <input
                                        className="mr-2"
                                        type="radio"
                                        name={currentQuestion.id.toString()}
                                        onChange={(e) => addAnswer(e)}
                                        value={option}
                                        checked={answered[currentQuestion.id] === option}
                                    />
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-8 w-full flex flex-row justify-between">
                        {pageIndex > 0 ? (
                            <button
                                className="bg-white text-black py-2 px-3 text-sm rounded-lg border border-white cursor-pointer hover:bg-transparent hover:text-gray-200"
                                onClick={() => setPageIndex(pageIndex - 1)}
                            >
                                Previous Question
                            </button>
                        ) : (
                            <button
                                className="bg-white text-black py-2 px-3 text-sm rounded-lg border border-white cursor-pointer hover:bg-transparent hover:text-gray-200"
                                onClick={() => router.push("/")}
                            >
                                Cancel
                            </button>
                        )}
                        {pageIndex < totalQuestions - 1 ? (
                            <button
                                className={`py-2 px-3 text-sm rounded-lg border cursor-pointer ${answered[currentQuestion.id] === undefined
                                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                    : "bg-white text-black border-white hover:bg-transparent hover:text-gray-200"
                                    }`}
                                onClick={() => setPageIndex(pageIndex + 1)}
                                disabled={answered[currentQuestion.id] === undefined}
                            >
                                Next Question
                            </button>
                        ) : (
                            answered[currentQuestion.id] !== undefined && (
                                <button
                                    onClick={calculateScore}
                                    className="text-center bg-green-700 text-white py-2 px-4 text-sm rounded-lg border border-white cursor-pointer font-bold hover:border-green-700"
                                >
                                    Finish
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
