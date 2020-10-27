import { getRepository, Connection, Repository } from 'typeorm';
import { Article as ArticleEnity } from '../../entity/article';
import CONNECTION_NAME from '../../constants/default_db_connection';

export default class Article {
  private connectionName = CONNECTION_NAME;
  private repository: Repository<ArticleEnity>;

  constructor(connection?: Connection) {
    if (connection !== undefined) {
      this.connectionName = connection.name;
    } else {
      this.connectionName = this.connectionName;
    }
    this.repository = getRepository(ArticleEnity, this.connectionName);
  }
}
