export class FeedImagesSchema {
  static schema = {
      name: 'FeedImages',
      primaryKey: 'upload_id',
      properties: {
          upload_id: 'string', //primary key
          name: 'string?',
          path: 'string?',
          thumbnail: 'string?',
          type: 'string',
          feed_id: 'string',
          //timestamp: {type: 'int', default: new Date().getTime()}
      }
  }
}
