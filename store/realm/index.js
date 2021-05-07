import Realm from 'realm';
import TalkListSchema from './TalkListSchema';

const realm = new Realm({
    schema: [TalkListSchema],
    schemaVersion: 2
});

export default realm;