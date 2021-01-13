import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Plugins } from "@capacitor/core";
import { BranchInitEvent } from "capacitor-branch-deep-links";
const { BranchDeepLinks } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: "Inbox",
      url: "/folder/Inbox",
      icon: "mail",
    },
    {
      title: "Outbox",
      url: "/folder/Outbox",
      icon: "paper-plane",
    },
    {
      title: "Favorites",
      url: "/folder/Favorites",
      icon: "heart",
    },
    {
      title: "Archived",
      url: "/folder/Archived",
      icon: "archive",
    },
    {
      title: "Trash",
      url: "/folder/Trash",
      icon: "trash",
    },
    {
      title: "Spam",
      url: "/folder/Spam",
      icon: "warning",
    },
  ];
  public labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      BranchDeepLinks.addListener("init", (event: BranchInitEvent) => {
        // Retrieve deeplink keys from 'referringParams' and evaluate the values to determine where to route the user
        // Check '+clicked_branch_link' before deciding whether to use your Branch routing logic
        console.log(event.referringParams);
      });

      BranchDeepLinks.addListener("initError", (error: any) => {
        console.error(error);
      });
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }
}
