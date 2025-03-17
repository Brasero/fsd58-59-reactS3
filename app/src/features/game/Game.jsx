import { useState } from 'react';
import { useWinPastriesMutation } from '../api/apiSlice';

export default function Game () {
    const [remainingDraws, setRemainingDraws] = useState(3);
    const [lastDraw, setLastDraw] = useState(Array(5).fill(null));
    const [win, setWin] = useState(null);

    const [winPastries, { isLoading, isSuccess, data: winnedPastries }] = useWinPastriesMutation();

    function handleRollTheDice () {
        if (remainingDraws <= 0 || win) {
            return;
        }

        const newDraw = Array(5);
        for (let i = 0; i < 5; i++) {
            newDraw[i] = Math.floor(Math.random() * 6) + 1;
        }

        // Check if its a win and if so how many pastry we win
        let bestResult = 0;
        newDraw.forEach(element => {
            const match = newDraw.filter(item => item === element).length;
            bestResult = match > bestResult ? match : bestResult;
        });

        let numberPastriesWinned = 0;
        if (bestResult >= 4) {
            numberPastriesWinned = 3;
        } else if (bestResult == 3) {
            numberPastriesWinned = 2;
        } else if (bestResult == 2) {
            numberPastriesWinned = 1;
        }

        let newDrawWin = bestResult >= 2;
        setWin(newDrawWin);
        setLastDraw(newDraw);
        setRemainingDraws(newDrawWin ? 0 : remainingDraws - 1);

        if (numberPastriesWinned > 0) {
            winPastries(numberPastriesWinned);
        }
    }

    return (
        <div className="yams">
            <div className='dices'>
                { 
                    lastDraw.map(dice => {
                        if (dice) {
                            return (<img src={ `/public/img/Dice-${ dice }.png` } />);
                        } else {
                            return (<img src={ `/public/img/Dice-unknown.png` } />);
                        }
                    })
                }
            </div>
            <div className={ `results ${win ? 'success' : ''}` }>
                { win && (
                    <p>
                        <b>BRAVO</b>, vous avez gagné :<br/>
                        { isLoading && 'Tirage en cours.' }
                        { isSuccess && (
                            <ul>
                                { winnedPastries.map(pastrie => (
                                    <li key={pastrie.id}>{ pastrie.name }</li>
                                )) }
                            </ul>
                        )}
                    </p>
                )}
                { win === false && (
                    <p><b>PERDU</b></p>
                )}
            </div>
            {
                remainingDraws > 0
                ?
                    <button className='btn' onClick={ handleRollTheDice }>Il vous reste { remainingDraws } essais</button>
                :
                    <button className='disable btn'>Vous n'avez plus d'essais</button>
            }
            
        </div>
    )
}