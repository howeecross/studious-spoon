import { Component } from '@angular/core';

import * as _ from 'lodash';

// Providers
import { ConfigProvider } from '../../../../providers/config/config';
import { HomeIntegrationsProvider } from '../../../../providers/home-integrations/home-integrations';

@Component({
  selector: 'page-shapeshift-settings',
  templateUrl: 'shapeshift-settings.html',
})
export class ShapeshiftSettingsPage {

  private serviceName: string = 'shapeshift';
  public showInHome: any;
  public service: any;

  constructor(
    private configProvider: ConfigProvider,
    private homeIntegrationsProvider: HomeIntegrationsProvider
  ) {
    this.service = _.filter(this.homeIntegrationsProvider.get(), { name: this.serviceName });
    this.showInHome = !!this.service[0].show;
  }

  public showInHomeSwitch(): void {
    let opts = {
      showIntegration: { [this.serviceName] : this.showInHome }
    };
    this.homeIntegrationsProvider.updateConfig(this.serviceName, this.showInHome);
    this.configProvider.set(opts);
  }
}
