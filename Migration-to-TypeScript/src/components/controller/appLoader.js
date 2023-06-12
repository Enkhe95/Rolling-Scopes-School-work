import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '7acd9dbdf4a3423c824b9d95e7420ef4', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
