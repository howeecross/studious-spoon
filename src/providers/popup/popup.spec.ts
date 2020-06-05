/* tslint:disable */
import { TestBed, inject, async } from '@angular/core/testing';
import {
  AlertController,
  App,
  Config,
  Platform
} from 'ionic-angular';
import { Logger } from '../../providers/logger/logger';
import {
  TranslateModule,
  TranslateService,
  TranslateLoader,
  TranslateFakeLoader
} from '@ngx-translate/core';
import { PopupProvider } from './popup';

describe('PopupProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      providers: [
        PopupProvider,
        AlertController,
        App,
        Config,
        Platform,
        Logger,
        TranslateService
      ]
    });
  });

  it('should exist', inject([PopupProvider], (popupProvider: PopupProvider) => {
    expect(popupProvider).not.toBeUndefined();
  }));

  it('should have an alert', inject([PopupProvider], (popupProvider: PopupProvider) => {
      spyOn(popupProvider, 'ionicAlert');
      popupProvider.ionicAlert('title', 'subtitle', 'ok text');
      expect(popupProvider.ionicAlert).toHaveBeenCalledWith('title', 'subtitle', 'ok text');
  }));
});
