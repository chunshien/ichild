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

    GetFeeds(to_user_id, page=0, size=0){
      this.OpenRealmSchema();
      //console.log('after OpenRealmSchema', new Date().getTime());
      var Feeds = this.RealmHelper.Read(this.realm, this.FeedSchema, 'to_user_id = "' + to_user_id + '"', page, size);
      Feeds = this.RealmHelper.RealmToJson(Feeds);
      Feeds = this.RealmHelper.ExcludeKey('timestamp',Feeds)

      Feeds.map((item, index) => {
        var FeedImages = this.RealmHelper.Read(this.realm, this.FeedImagesSchema, 'feed_id = "' + item.feed_id + '"');
        FeedImages = this.RealmHelper.RealmToJson(FeedImages);
        FeedImages = this.RealmHelper.ExcludeKey('timestamp',FeedImages)
        item['feed_images'] = FeedImages;

        var FeedFiles = this.RealmHelper.Read(this.realm, this.FeedFilesSchema, 'feed_id = "' + item.feed_id + '"');
        FeedFiles = this.RealmHelper.RealmToJson(FeedFiles);
        FeedFiles = this.RealmHelper.ExcludeKey('timestamp',FeedFiles)
        item['feed_files'] = FeedFiles;
        item['feed_images'] = Array.from(item['feed_images']);
      });

      //console.log(Feeds);
      //console.log('after add images and files result', new Date().getTime());
      this.CloseRealmSchema();
      return Feeds;
    }
}
