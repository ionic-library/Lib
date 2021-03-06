import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { HeaderColor } from '@ionic-native/header-color';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


import { AppMinimize } from '@ionic-native/app-minimize';
export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'YoutubePage';

  pages: PageInterface[];

  constructor(public platform: Platform,
    private nativePageTransitions: NativePageTransitions,
    public statusBar: StatusBar, private network: Network,
    public splashScreen: SplashScreen, private headerColor: HeaderColor,
    private appMinimize: AppMinimize) {

    this.initializeApp();

    this.platform.registerBackButtonAction(() => {
      this.appMinimize.minimize();
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Youtube', pageName: 'YoutubePage', tabComponent: 'YoutubePage', index: 0, icon: 'home' },
      { title: 'Map', pageName: 'MapsPage', tabComponent: 'MapsPage', index: 1, icon: 'locate' },
      { title: 'Text to Speech', pageName: 'TtsPage', tabComponent: 'TtsPage', index: 3, icon: 'microphone' },
      { title: 'Speech to Text', pageName: 'SttPage', tabComponent: 'SttPage', index: 4, icon: 'mic' },
      { title: 'My SMS', pageName: 'MySmsPage', tabComponent: 'MySmsPage', index: 5, icon: 'text' },
      { title: 'Image Gallery', pageName: 'ImageGalleryPage', tabComponent: 'ImageGalleryPage', index: 6, icon: 'images' },
      { title: 'Dialogs & Toast', pageName: 'DialogPage', tabComponent: 'DialogPage', index: 7, icon: 'flame' },
      { title: 'Forms', pageName: 'FormFieldsPage', tabComponent: 'FormFieldsPage', index: 8, icon: 'list-box' },
      
      { title: 'Calendar', pageName: 'CalendarPage', tabComponent: 'CalendarPage', index: 8, icon: 'calendar' },
      { title: 'Native Controls', pageName: 'NativeControlsPage', tabComponent: 'NativeControlsPage', index: 19, icon: 'cog' },
      { title: 'About', pageName: 'AboutPage', tabComponent: 'AboutPage', index: 20, icon: 'information-circle' },

    ];

  }

  ionViewDidEnter() {
    this.network.onConnect().subscribe(data => {
      console.log(data);
    }
      , (error) => console.log(error));

    this.network.onDisconnect().subscribe(data => {
      console.log(data);
    }, (error) => console.log(error));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.headerColor.tint('#488aff');
    });
  }

  openPage(page: PageInterface) {
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: -1,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
    };
    this.nativePageTransitions.slide(options);

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    this.nav.setRoot(page.tabComponent);
  }
}
