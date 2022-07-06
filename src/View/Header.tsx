import { observer } from 'mobx-react-lite';
import store from '../ModelView/store';

const Header = () => (
    <div className='header'>
        <div className='timer' style={{ backgroundColor: '7B68EE' }}>{store.timer.Score / 1000} sec</div>
        <div className='label'>
            <div>
                <button onClick={() => window.location.reload()}>Restart</button>
                <button onClick={() => store.ui.moveToRank()}>Ranking</button>
            </div>
            <span>{store.block.targetLabel}</span>
        </div>
    </div>
);

export default observer(Header);