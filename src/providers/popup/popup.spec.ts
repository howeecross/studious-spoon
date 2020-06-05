import { inject, TestBed } from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { AlertController, App, Config, Platform } from 'ionic-angular';
import { Logger } from '../../providers/logger/logger';
import { PopupProvider } from './popup';

import { AlertControllerMock } from 'ionic-mocks';

describe('PopupProvider', () => {
  let alertCtrl: AlertController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      providers: [
        PopupProvider,
        App,
        Config,
        Platform,
        Logger,
        TranslateService,
        {
          provide: AlertController,
          useFactory: () => AlertControllerMock.instance()
        }
      ]
    });
    alertCtrl = AlertControllerMock.instance();
  });

  it('should exist', inject([PopupProvider], (popupProvider: PopupProvider) => {
    expect(popupProvider).not.toBeUndefined();
  }));

  it('should have an alert', inject(
    [PopupProvider],
    (popupProvider: PopupProvider) => {
      popupProvider.ionicAlert('title', 'subtitle', 'ok text').then(done => {
        let alert = alertCtrl.create();
        expect(popupProvider.ionicAlert).toHaveBeenCalledWith(
          'title',
          'subtitle',
          'ok text'
        );
        expect(alert.present).toHaveBeenCalled();
        done();
      });
    }
  ));

  it('should have a confirm', inject(
    [PopupProvider],
    (popupProvider: PopupProvider) => {
      popupProvider.ionicConfirm('title', 'message').then(done => {
        let alert = alertCtrl.create();
        expect(popupProvider.ionicConfirm).toHaveBeenCalledWith(
          'title',
          'message'
        );
        expect(alert.present).toHaveBeenCalled();
        done();
      });
    }
  ));

  it('should have a prompt', inject(
    [PopupProvider],
    (popupProvider: PopupProvider) => {
      let opts = {
        defaultText: null,
        placeholder: null,
        type: 'text',
        useDanger: null,
        enableBackdropDismiss: null
      };
      let title = 'ok text';
      let message = 'cancel text';
      popupProvider.ionicPrompt(title, message, opts).then(() => {
        expect(opts && opts.useDanger).toBeNull();
        expect(!!(opts && opts.enableBackdropDismiss)).toBe(false);
        let alert = alertCtrl.create({
          title,
          message
        });
        expect(alert.present).toHaveBeenCalled();
      });
    }
  ));
});
