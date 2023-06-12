import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document
            .querySelector('.sources')
            ?.addEventListener('click', (e: Event) =>
                this.controller.getNews(e, (data: NewsData[]) => this.view.drawNews(data))
            );

        this.controller.getSources((data: SourceData[]) => this.view.drawSources(data));
    }
}

export default App;