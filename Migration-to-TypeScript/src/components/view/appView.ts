import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: { articles?: unknown[] }) {
        const values = data?.articles ?? [];
        this.news.draw(values);
    }

    public drawSources(data: { sources?: unknown[] }) {
        const values = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
