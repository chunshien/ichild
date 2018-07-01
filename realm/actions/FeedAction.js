var Realm = require('realm')
import { FeedSchema } from '../../realm/models/feed/FeedSchema'
import { FeedImagesSchema } from '../../realm/models/feed/FeedImagesSchema'
import { FeedFilesSchema } from '../../realm/models/feed/FeedFilesSchema'
import RealmHelper from '../../realm/helpers/RealmHelper'

export default class FeedAction {
    constructor() {
        this.RealmHelper = new RealmHelper();
        this.FeedSchema = 'Feed';
        this.FeedImagesSchema = 'FeedImages';
        this.FeedFilesSchema = 'FeedFiles';
    }

    OpenRealmSchema(){
      this.realm = new Realm({
        schema: [FeedSchema, FeedImagesSchema, FeedFilesSchema],
      });
    }

    CloseRealmSchema(){
      this.realm.close();
    }

    CreateFeeds(results) {
      this.OpenRealmSchema();
      //this.RealmHelper.DeleteAll(this.realm, this.NewLaunchesSchema);
      this.RealmHelper.WriteAll(this.realm, this.FeedSchema, results, 'feed_id');
      results.map((item, index) => {
        if(item.feed_images.length > 0){
          this.RealmHelper.WriteAll(this.realm, this.FeedImagesSchema, item.feed_images, 'upload_id');
        }
        if(item.feed_files.length > 0){
          this.RealmHelper.WriteAll(this.realm, this.FeedFilesSchema, item.feed_files, 'upload_id');
        }
      });
      this.CloseRealmSchema();
    }
}
