import { useState, useRef } from 'react';
import './TicTacToe.css';
import x_icon from '../assets/x_icon.jpg';
import o_icon from '../assets/o_icon.png';

const TicTacToe = () => {
    const [data, setData] = useState(['', '', '', '', '', '', '', '', '']);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);

    const toggle = (num) => {
        if (lock || data[num]) return;

        const newData = [...data];
        if (count % 2 === 0) {
            newData[num] = x_icon;
        } else {
            newData[num] = o_icon;
        }
        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (newData) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                won(newData[a]);
                return;
            }
        }
    };

    const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: <img src="${winner}" alt="Winner Icon" style="width: 50px; height: 50px;">`;
};


    const resetGame = () => {
        setData(['', '', '', '', '', '', '', '', '']);
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = 'Tic Tac Toe In <span>React</span>';
    };

    return (
        <div className='container'>
            <h1 className="title" ref={titleRef}>Tic Tac Toe In <span>React</span></h1>
            <div className='board'>
                {data.map((value, index) => (
                    <div key={index} className="boxes" onClick={() => toggle(index)}>
                        {value && <img src={value} alt="Tic Tac Toe Icon"/>}
                    </div>
                ))}
            </div>
            <button className='reset' onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;
