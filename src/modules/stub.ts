import faker, { fake } from 'faker';
import dayjs from 'dayjs';
import { PutLoginResponse } from '../types/api/put_login_response';
import { PutLogoutResponse} from '../types/api/put_logout_response';
import { GetArticlesRespose } from '../types/api/get_articles_response';
import { ArticleSummary } from '../types/article_summary';

export class Stub {

    private articles: ArticleSummary[];

    constructor() {
        this.articles = this.genArticles();
    }

    public putLogin(): PutLoginResponse {
        return {
            isSuccessLogin: true,
            member: {
                id: 11234,
                name: 'Charlotte De Witte ',
                email: 'charlotte@de.witte'
            }
        }
    }

    public putLogout(): PutLogoutResponse {
        return {
            success: true,
        }
    }

    public getArticles(): GetArticlesRespose {
        return {
            articles: [
                {
                    title: '',
                }
            ],
        }

    }

    public getArticle() {

    }

    public postArticle() {

    }
    
    public putArticle() {

    }
    
    public deleteArticle() {
        
    }

    private genArticles():ArticleSummary[] {
        const result: ArticleSummary[] = [];
        for (let i = 0; i < 10; i++) {
            const articleSummary: ArticleSummary = {
                title: faker.lorem.words(),
                summary: faker.lorem.paragraphs(),
                updatedAt: dayjs().subtract(i, 'day').toString()
            };
            result.push(articleSummary);
        }
        return result;
    }
}