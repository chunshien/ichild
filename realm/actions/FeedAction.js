var Realm = require('realm')
import { FeedSchema } from '../../realm/models/feed/FeedSchema'
import { FeedImagesSchema } from '../../realm/models/feed/FeedImagesSchema'
import { FeedFilesSchema } from '../../realm/models/feed/FeedFilesSchema'
import RealmHelper from '../../realm/helpers/RealmHelper'

export default class FeedAction {
    constructor() {
        //this.RealmHelper = new RealmHelper();
        this.FeedSchema = 'Feed';
        this.FeedImagesSchema = 'FeedImages';
        this.FeedFilesSchema = 'FeedFiles';
    }
}
