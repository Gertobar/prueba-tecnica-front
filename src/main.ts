import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'admin-lte/dist/js/adminlte.min.js';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
