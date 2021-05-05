import Realm from 'realm';
import TalkListSchema from './TalkListSchema';

const realm = new Realm({
    schema: [TalkListSchema],
});

export default realm;