import Game from '../features/game/Game';

export default function GamePage () {
    return (
        <main>
            <section className='section-game'>
                <h1>Jeu du yams</h1>
                <div>
                    <p>
                        Vous avez 3 lancés.<br/>
                        Si vous obtenez une paire (deux dés identiques), vous gagnez 1 pâtisserie. <br/>
                        Avec un brelan (trois dés identiques), c'est 2 pâtisseries.<br/>
                        Et en cas de carré (quatre dés identiques), vous remportez 3 pâtisseries. <br/>
                        Accumulez les délices pour remporter la partie !.
                    </p>
                </div>
                <div>
                    <Game />
                </div>
            </section>
        </main>
    )
}