import { Directive, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Clipboard } from '@ionic-native/clipboard';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from 'ionic-angular';

// providers
import { ActionSheetProvider } from '../../providers/action-sheet/action-sheet';
import { Logger } from '../../providers/logger/logger';
import { NodeWebkitProvider } from '../../providers/node-webkit/node-webkit';
import { PlatformProvider } from '../../providers/platform/platform';

@Directive({
  selector: '[copy-to-clipboard]', // Attribute selector
  inputs: ['value: copy-to-clipboard', 'hideToast: hide-toast'],
  host: {
    '(click)': 'copy()'
  }
})
export class CopyToClipboard {
  public value: string;
  public hideToast: boolean;
  private dom: Document;
  private isCordova: boolean;
  private isNW: boolean;

  constructor(
    @Inject(DOCUMENT) dom: Document,
    public toastCtrl: ToastController,
    public clipboard: Clipboard,
    public platform: PlatformProvider,
    public logger: Logger,
    public translate: TranslateService,
    private nodeWebkitProvider: NodeWebkitProvider,
    private actionSheetProvider: ActionSheetProvider
  ) {
    this.logger.info('CopyToClipboardDirective initialized.');
    this.isCordova = this.platform.isCordova;
    this.isNW = this.platform.isNW;
    this.dom = dom;
  }

  private copyBrowser() {
    let textarea = this.dom.createElement('textarea');
    this.dom.body.appendChild(textarea);
    textarea.value = this.value;
    textarea.select();
    this.dom.execCommand('copy');
    this.dom.body.removeChild(textarea);
  }

  public copy() {
    if (!this.value) {
      return;
    }
    if (this.isCordova) {
      this.clipboard.copy(this.value);
    } else if (this.isNW) {
      this.nodeWebkitProvider.writeToClipboard(this.value);
    } else {
      this.copyBrowser();
    }
    if (this.hideToast) return;

    const infoSheet = this.actionSheetProvider.createInfoSheet(
      'copy-to-clipboard',
      { msg: this.value }
    );
    infoSheet.present();
  }
}
