import { observer } from 'mobx-react-lite';
import store from '../ModelView/store';

interface Props {
    ranking: number;
    name: string;
    score: number;
}

const RankItem = observer(({ ranking, name, score }: Props) => {
    return (
        <div className='rank-header'>
            <div>{ranking + 1}</div>
            <div>{name}</div>
            <div>{score / 1000}</div>
        </div>
    );
});

const RankTable = observer(() => {
    return (
        <div className='rank-container'>
            <div className='rank-header'>
                <div></div>
                <div>name</div>
                <div>sec</div>
            </div>
            <div>
                {store.record.Rank.map((n, i) => <RankItem
                    key={n.id} ranking={i} name={n.name} score={n.score}></RankItem>)} 
            </div>
            <button onClick={()=>window.location.reload()}>Restart</button>
        </div>
    );
});

export default RankTable;