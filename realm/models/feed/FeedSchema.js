export class FeedSchema {
  static schema = {
      name: 'Feed',
      primaryKey: 'feed_id',
      properties: {
          feed_id: 'string', //primary key
          to_user_id: 'string',
          title: 'string?',
          content: 'string?',
          desc: 'string?',
          creator_id: 'string?',
          creator_name: 'string?',
          source: 'string?',
          user_photo: 'string?',
          comments: 'int?',
          downloads: 'int?',
          likes: 'int?',
          posted_date: 'string?',
          updated_date: 'string?',
          timestamp: {type: 'int', default: new Date().getTime()}
      }
  }
}
