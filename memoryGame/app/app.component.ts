import { Component } from '@angular/core';

@Component({
    selector: 'pm-app',
    template: `
    <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid text-center'>
                <!-- a class='navbar-brand'>{{pageTitle}}</a -->
                <h3 class="text-center text-primary"> <a [routerLink]="['/memory-game']">Simple memory game</a></h3>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
     </div>
     `
})
export class AppComponent {
    pageTitle: string = 'ng2 Game';
}
