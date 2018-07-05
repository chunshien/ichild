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
      //this.OpenRealmSchema();
      this.RealmHelper.WriteAll(this.realm, this.FeedSchema, results, 'feed_id');
      //this.CloseRealmSchema();
    }

    GetFeeds(to_user_id, page=0, size=0){
      //this.OpenRealmSchema();
      //console.log('after OpenRealmSchema', new Date().getTime());
      var Feeds = this.RealmHelper.Read(this.realm, this.FeedSchema, 'to_user_id = "' + to_user_id + '"', page, size);
      console.log(Feeds);
      //console.log('after add images and files result', new Date().getTime());
      //this.CloseRealmSchema();
      return Feeds;
    }
}
